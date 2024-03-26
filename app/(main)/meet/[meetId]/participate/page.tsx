import { getMeet } from '@/controllers/meet';
import ParticipateForm from './_component/ParticipateForm';
import { InfoCardWrapper } from '@/app/login/_component/info-card';

export default async function ParticipateMeetPage({
  params,
}: {
  params: { meetId: string };
}) {
  const meet = await getMeet(params.meetId);
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-xl mt-3">{meet.name}</p>
      <InfoCardWrapper source="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Calendar.png" />
      <p>{meet.description}</p>
      <ParticipateForm
        meetId={params.meetId}
        isProtected={meet.password ? true : false}
      />
    </div>
  );
}
