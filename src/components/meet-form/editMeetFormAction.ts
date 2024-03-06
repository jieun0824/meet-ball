'use server';

import { redirect } from 'next/navigation';
import { updateMeet } from '@/controllers/meet';
import { MeetType } from '@prisma/client';
import { validateMeetMode, validateString } from '@/lib/validation';

export default async function handleSubmit(formData: FormData) {
  const meetId = formData.get('meetId')?.toString();
  if (!meetId) throw new Error('meetId is not provided');

  const meetName = formData.get('meetName')?.toString();
  if (!validateString(meetName)) throw new Error('이름을 입력하세요.');

  const meetDescription = formData.get('meetDescription')?.toString();

  const meetMode = formData.get('meetMode')?.toString() as MeetType;
  if (!validateMeetMode(meetMode)) throw new Error();

  const confirmDate = new Date(formData.get('confirmDate')!.toString());
  confirmDate.setHours(parseInt(formData.get('confirmHour')!.toString()));
  confirmDate.setMinutes(parseInt(formData.get('confirmMinute')!.toString()));

  let startTime = parseInt(formData.get('meetStartHour')!.toString());
  if (formData.get('meetStartMinute')!.toString() === '30') startTime += 1;

  let endTime = parseInt(formData.get('meetEndHour')!.toString());
  if (formData.get('meetEndMinute')!.toString() === '30') endTime += 1;

  const meetSelections = formData.get('meetSelections')?.toString().split(',');
  if (!meetSelections || meetSelections.length === 0)
    throw new Error('날짜를 선택해주세요.');

  const meetPassword = formData.get('password')?.toString();

  try {
    const updatedMeet = await updateMeet(meetId, {
      name: meetName,
      description: meetDescription,
      meetType: meetMode,
      startTime,
      endTime,
      datesOrDays: meetSelections,
      confirmTime: confirmDate,
      password: meetPassword,
    });
    redirect(`/meet/${updatedMeet.id}/edit`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
