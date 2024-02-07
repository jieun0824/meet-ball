'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/auth';

export async function getMyInfo() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;
  return user;
}

export async function getMyManagingMeets() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;
  const meets = await prisma.meet.findMany({
    where: {
      managerId: user.id,
    },
  });
  return meets;
}

export async function getMyParticipatingMeets() {
  const session = await auth();
  if (!session) return null;
  const { user } = session;
  if (!user) return null;
  //   const meets = await prisma.meet.findMany({
  //     where: {
  //       participants: {
  //         some: {
  //           userId: user.id,
  //         },
  //       },
  //     },
  //   });
  const meets = await prisma.participantsOnMeets.findMany({
    where: {
      userId: user.id,
    },
  });
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
