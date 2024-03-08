import { getMeet } from '@/controllers/meet';
import ParticipateButton from './ParticipateButton';
import MeetDescription from '../../MeetDescription';
export default async function ParticipateMeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeet(params.meetId);
  return (
    <>
      <p className="text-xl mt-3">{meet.name}</p>
      <MeetDescription description={meet.description} />
      <ParticipateButton meetId={params.meetId} />
    </>
  );
}
