import { getMeetWithParticipants } from '@/controllers/meet';
import { getUsersByUserIds } from '@/controllers/user';

export default async function MeetParticipantsPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeetWithParticipants(params.meetId);
  const users = await getUsersByUserIds(
    meet.participants.map(participant => participant.userId)
  );

  return <>{users.map(user => user.name ?? user.email ?? user.id)}</>;
}
