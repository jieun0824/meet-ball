import type { Meet, MeetType } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/authentication';

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

export type CreateMeetArguments = {
  name: string;
  description?: string;
  meetType: MeetType;
  dateOrDays: string[];
  confirmTime?: Date;
  password?: string;
};

export async function createMeet(args: CreateMeetArguments): Promise<Meet> {
  try {
    const meet = await prisma.meet.create({
      data: {
        managerId: currentUser.id,
        // name: args.name,
        // description: args.description,
        // meetType: args.meetType,
        // datesOrDays: args.dateOrDays,
        // confirmTime: args.confirmTime,
        // password: args.password,
        ...args,
        participants: {
          create: {
            userId: currentUser.id, // should involve itself as participant at first
            hasAccepted: true, // should be true for manager by default
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

export async function getMeet(meetId: string): Promise<Meet> {
  const currentUser = await getCurrentUser();
  try {
    const meet = await prisma.meet.findUniqueOrThrow({
      where: {
        id: meetId,
      },
      include: {
        participants: true,
      },
    });
    if (
      // are you the manager or one of the participants of this meet?
      //   meet.managerId !== currentUser.id ||  meet participants에 manager가 포함되어있으므로 확인 x
      meet.participants.some(
        participant => participant.userId === currentUser.id
      )
    ) {
      throw Error('not authorized');
    }
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
