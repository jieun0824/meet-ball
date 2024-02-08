'use client';
import { useRef } from 'react';
import { ClockIcon, MoreIcon, PeopleIcon } from '../icon';

type mainCardProps = {
  meetName: string;
  description: string;
  meetTime: string[];
  participants: string[];
  num: number;
};

export default function MainCard({
  meetName,
  description,
  meetTime,
  participants,
  num,
}: mainCardProps) {
  function formatTimeRangeWithPeriod(timeRange: string[]) {
    const formattedHour = (hour: string) =>
      (parseInt(hour) % 12 || 12).toString();
    const period = (hour: string) => (parseInt(hour) >= 12 ? 'pm' : 'am');
    const [startHour, startMin, endHour, endMin] = timeRange;
    const startTime = `${formattedHour(startHour)}:${startMin} ${period(startHour)}`;
    const endTime = `${formattedHour(endHour)}:${endMin} ${period(endHour)}`;

    return `${startTime}-${endTime}`;
  }

  return (
    <div className={`bg-pointColor p-8 w-80 rounded-2xl text-black shadow-2xl`}>
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold">{meetName}</h1>
        <MoreIcon size={24} />
      </div>
      <h3 className="mb-2">{description}</h3>
      <div>
        <div className="flex items-center mb-2">
          <ClockIcon color="black" className="mr-1" />
          <span>{formatTimeRangeWithPeriod(meetTime)}</span>
        </div>
        <div className="flex items-center">
          <PeopleIcon color="black" className="mr-1" />
          {participants.join(', ')}
        </div>
      </div>
    </div>
  );
}
