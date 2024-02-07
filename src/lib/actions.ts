'use server';

import type { Meet } from '@prisma/client';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getMyInfo() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user || !user.id) return null;
  return user;
}

export async function getMyManagingMeets(): Promise<Meet[] | null> {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user || !user.id) return null;
  const meets = await prisma.meet.findMany({
    where: {
      managerId: user.id,
    },
  });
  return meets;
}

export async function getMyParticipatingMeets(): Promise<Meet[] | null> {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user || !user.id) return null;
  //   const meets = await prisma.meet.findMany({
  //     where: {
  //       participants: {
  //         some: {
  //           userId: user.id,
  //         },
  //       },
  //     },
  //   });
  const meets = (
    await prisma.user.findUniqueOrThrow({
      where: {
        id: user.id,
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
}

export async function createMeet(
  name: string,
  description: string,
  dates: string[]
) {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user || !user.id) return null;
  const meet = await prisma.meet.create({
    data: {
      name,
      description,
      dates,
      managerId: user.id,
    },
  });
  return meet;
}
