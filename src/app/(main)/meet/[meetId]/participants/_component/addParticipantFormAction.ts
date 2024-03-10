// 'use server';

// import { addParticipantsToMeet } from '@/controllers/meet';
// import { getUserIdsByEmails } from '@/controllers/user';
// import { validateString } from '@/lib/validation';
// import { redirect } from 'next/navigation';

// export default async function addParticipantFormAction(formData: FormData) {
//   const meetId = formData.get('meetId')?.toString();
//   if (!validateString(meetId)) throw new Error('meetId is not provided');

//   const email = formData.get('email')?.toString();
//   if (!validateString(email)) throw new Error('email is not provided');

//   const userIds = await getUserIdsByEmails([email]);
//   if (userIds.length === 0) throw new Error('email is not found');

//   const meet = await addParticipantsToMeet(meetId, userIds);

//   redirect(`/meet/${meetId}/participants`);
// }
