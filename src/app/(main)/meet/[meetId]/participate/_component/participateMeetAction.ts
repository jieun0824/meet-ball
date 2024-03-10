'use server';

import { participateMeet } from '@/controllers/meet';
import { Prisma } from '@prisma/client';
import { redirect } from 'next/navigation';

export default async function participateFormAction(formData: FormData) {
  const meetId = formData.get('meetId')?.toString();
  const password = formData.get('meetPassword')?.toString();
  try {
    if (!meetId) throw new Error('meetId is not provided');
    if (password === undefined) throw new Error('password is not provided');
    await participateMeet(meetId, password);
    redirect(`/meet/${meetId}`);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('이미 참여중인 meet 입니다.');
      }
    }
    throw error;
  }
}
