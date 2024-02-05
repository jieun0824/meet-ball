'use client';
import { useRef } from 'react';
import { ClockIcon, MoreIcon, PeopleIcon } from '../icon';

type mainCardProps = {
  meetName: string;
  description: string;
  meetTime: string;
  peopleInfo: string;
  num: number;
};

export default function MainCard({
  meetName,
  description,
  meetTime,
  peopleInfo,
  num,
}: mainCardProps) {
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
          {meetTime}
        </div>
        <div className="flex items-center">
          <PeopleIcon color="black" className="mr-1" />
          {peopleInfo}
        </div>
      </div>
    </div>
  );
}
