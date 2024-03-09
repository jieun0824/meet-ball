import { getMeet } from '@/controllers/meet';
import MeetDescription from '../../MeetDescription';
import ParticipateForm from './ParticipateForm';
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
      <ParticipateForm
        meetId={params.meetId}
        isProtected={meet.password ? true : false}
      />
    </>
  );
}
