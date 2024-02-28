'use server';

import { Prisma } from '@prisma/client';
import type { Meet, MeetType } from '@prisma/client';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/authentication';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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

export type CreateMeetParams = {
  name: string;
  description?: string;
  meetType: MeetType;
  startTime: number; // 0-47
  endTime: number; // 0-47
  datesOrDays: string[];
  confirmTime: Date | string;
  password?: string;
};

export async function createMeet(args: CreateMeetParams): Promise<Meet> {
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
    const meetId = meet.id;
    redirect(`/meet/${meetId}/edit`);
    return meet;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const meetWithParticipants = Prisma.validator<Prisma.MeetDefaultArgs>()({
  include: { participants: true },
});

export type MeetWithParticipants = Prisma.MeetGetPayload<
  typeof meetWithParticipants
>;

export async function getMeet(meetId: string): Promise<MeetWithParticipants> {
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

export type UpdateMeetParams = {
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
  args: UpdateMeetParams
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

//save days as cookies
export async function setSelectionCookie(data: {
  mode: MeetType;
  selections: string[];
}) {
  try {
    cookies().set('selection', JSON.stringify(data));
    // const dayCookie = cookies().get('days');
    // if (dayCookie != undefined) {
    //   console.log(dayCookie);
    // } else {
    //   console.log('cookie is undefined');
    // }
  } catch (error) {
    console.error(error);
  }
  // redirect('/create');
}
