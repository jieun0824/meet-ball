'use server';

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
  startTime: number; // 0-47
  endTime: number; // 0-47
  datesOrDays: string[];
  confirmTime: Date;
  password?: string;
};

export async function createMeet(args: CreateMeetArguments): Promise<Meet> {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.meet.create({
      data: {
        managerId: currentUser.id,
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
  try {
    const currentUser = await getCurrentUser();
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
      return meet;
    } else {
      throw Error('not authorized');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type UpdateMeetArguments = {
  name?: string;
  description?: string;
  meetType?: MeetType;
  dateOrDays?: string[];
  confirmTime?: Date;
  isConfirmed?: boolean;
  password?: string;
};

export async function updateMeet(
  meetId: string,
  args: UpdateMeetArguments
): Promise<Meet> {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.meet.update({
      where: {
        id: meetId,
        managerId: currentUser.id, // only authorized for manager
      },
      data: {
        ...args,
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteMeet(meetId: string): Promise<Meet> {
  const currentUser = await getCurrentUser();
  try {
    const meet = await prisma.meet.delete({
      where: {
        id: meetId,
        managerId: currentUser.id, // only authorized for manager
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export type TimeTable = {
  [key: string]: number[];
};

export async function acceptMeetInvitation(meetId: string) {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.participantsOnMeets.update({
      where: {
        meetId_userId: {
          meetId: meetId,
          userId: currentUser.id,
        },
      },
      data: {
        hasAccepted: true,
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTimeTable(meetId: string) {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.participantsOnMeets.findUniqueOrThrow({
      where: {
        meetId_userId: {
          meetId: meetId,
          userId: currentUser.id,
        },
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateTimeTable(meetId: string, timeTable: TimeTable) {
  try {
    const currentUser = await getCurrentUser();
    const meet = await prisma.participantsOnMeets.update({
      where: {
        meetId_userId: {
          meetId: meetId,
          userId: currentUser.id,
        },
      },
      data: {
        timeTable,
      },
    });
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
