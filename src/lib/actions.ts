'use server';

import type { User } from 'next-auth';
import type { Meet } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/authentication';

export async function getMyInfo(): Promise<User> {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyManagingMeets(): Promise<Meet[]> {
  try {
    const currentUser = await getCurrentUser();
    const meets = await prisma.meet.findMany({
      where: {
        managerId: currentUser.id,
      },
    });
    return meets;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getMyParticipatingMeets(): Promise<Meet[]> {
  try {
    const currentUser = await getCurrentUser();
    const meets = (
      await prisma.user.findUniqueOrThrow({
        where: {
          id: currentUser.id,
        },
        include: {
          participatingMeets: {
            include: {
              meet: true,
            },
          },
        },
      })
    ).participatingMeets.map(participatingMeet => participatingMeet.meet);
    return meets;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createMeet(
  name: string,
  description: string,
  dates: string[]
): Promise<Meet> {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.meet.create({
      data: {
        name,
        description,
        dates,
        managerId: currentUser.id,
        participants: {
          // should involve itself as participant at first
          create: {
            userId: currentUser.id,
            hasAccepted: true, // should be true for this user by default
          },
        },
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
