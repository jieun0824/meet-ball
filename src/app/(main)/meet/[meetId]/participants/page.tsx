import AddParticipantForm from './AddParticipantForm';
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

  return (
    <>
      {users.map(user => (
        <div key={user.id}>{user.name ?? user.email ?? user.id}</div>
      ))}
      <AddParticipantForm meetId={params.meetId} />
    </>
  );
}
