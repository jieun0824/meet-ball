'use server';

import { createMeet } from '@/controllers/meet';
import { MeetType } from '@prisma/client';

export default async function handleSubmit(formData: FormData) {
  const meetingName = formData.get('meetingName')?.toString();
  if (!meetingName || meetingName.length === 0) {
    throw new Error('이름을 입력해주세요.');
  }
  const meetingDescription = formData.get('meetingDescription')?.toString();
  const meetingMode = formData.get('meetingMode')?.toString() as MeetType;

  const scheduleEndDate = new Date(formData.get('scheduleEndDate')!.toString());
  // const scheduleEndHour = Number(formData.get('scheduleEndHour'));
  // const scheduleEndMin = formData.get('scheduleEndMin') == '0' ? 0 : 0.5;

  const meetingStartHour = Number(formData.get('meetingStartHour'));
  const meetingStartMin = formData.get('meetingStartMin') == '0' ? 0 : 0.5;
  const meetingEndHour = Number(formData.get('meetingEndHour'));
  const meetingEndMin = formData.get('meetingEndMin') == '0' ? 0 : 0.5;

  const meetingSelections = formData
    .get('meetingSelections')
    ?.toString()
    .split(',');
  if (!meetingSelections || meetingSelections.length === 0) {
    throw new Error('날짜를 선택해주세요.');
  }
  const password = formData.get('password')?.toString();
  await createMeet({
    name: meetingName,
    description: meetingDescription,
    meetType: meetingMode,
    startTime: 2 * (meetingStartHour + meetingStartMin), // 0-47
    endTime: 2 * (meetingEndHour + meetingEndMin), // 0-47
    datesOrDays: meetingSelections,
    confirmTime: scheduleEndDate,
    password: password,
  });
}
