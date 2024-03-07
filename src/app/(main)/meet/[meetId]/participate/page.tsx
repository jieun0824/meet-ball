import { getMeet } from '@/controllers/meet';
import ParticipateButton from './ParticipateButton';
export default async function ParticipateMeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeet(params.meetId);
  return (
    <>
      <p className="text-xl mt-3">{meet.name}</p>
      <ParticipateButton meetId={params.meetId} />
    </>
  );
}
