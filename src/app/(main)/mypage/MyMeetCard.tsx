import { ClockIcon, MoreIcon, PeopleIcon } from '@/components/icon';

type mainCardProps = {
  meetName: string;
  description: string | null;
  startTime: number;
  endTime: number;
  participants: string[];
};

export default function MyMeetCard({
  meetName,
  description,
  startTime,
  endTime,
  participants,
}: mainCardProps) {
  function timeIntegerToTimeString(time: number) {
    const hour = Math.floor(time / 2);
    const minuteString = ((time % 2) * 30).toString().padStart(2, '0');
    if (hour >= 12) return `${hour - 12}:${minuteString} PM`;
    else return `${hour}:${minuteString} AM`;
  }

  return (
    <div className={`bg-cardColor p-8 w-80 rounded-2xl text-white shadow-2xl`}>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold">{meetName}</h1>
        <MoreIcon size={24} />
      </div>
      <h3 className="mb-2">{description}</h3>
      <div>
        <div className="flex items-center mb-2">
          <ClockIcon color="white" className="mr-1" />
          <span>{`${timeIntegerToTimeString(startTime)} - ${timeIntegerToTimeString(endTime)}`}</span>
        </div>
        <div className="flex items-center">
          <PeopleIcon color="white" className="mr-1" />
          {participants.join(', ')}
        </div>
      </div>
    </div>
  );
}
