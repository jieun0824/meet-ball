import { getMeetWithParticipants } from '@/controllers/meet';

export default async function MeetParticipantsPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeetWithParticipants(params.meetId);

  return <>{meet.participants.map(participant => participant.userId)}</>;
}
