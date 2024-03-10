'use server';

import { updateMeet } from '../../../../controllers/meet';
import { validateString } from '../../../../lib/validation';

export default async function handleSubmit(formData: FormData) {
  const meetId = formData.get('meetId')?.toString();
  if (!meetId) throw new Error('meetId is not provided');

  const meetName = formData.get('meetName')?.toString();
  if (!validateString(meetName)) throw new Error('이름을 입력하세요.');

  const meetDescription = formData.get('meetDescription')?.toString();

  const confirmDate = new Date(formData.get('confirmDate')!.toString());
  confirmDate.setHours(parseInt(formData.get('confirmHour')!.toString()));
  confirmDate.setMinutes(parseInt(formData.get('confirmMinute')!.toString()));

  let startTime = parseInt(formData.get('meetStartHour')!.toString()) * 2;
  if (formData.get('meetStartMinute')!.toString() === '30') startTime += 1;

  let endTime = parseInt(formData.get('meetEndHour')!.toString()) * 2;
  if (formData.get('meetEndMinute')!.toString() === '30') endTime += 1;

  if (startTime >= endTime) throw new Error('회의 시간을 확인하세요.');

  const meetPassword = formData.get('meetPassword')?.toString();

  try {
    return await updateMeet(meetId, {
      name: meetName,
      description: meetDescription,
      startTime,
      endTime,
      confirmTime: confirmDate,
      password: meetPassword,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
