'use client';
import EditMeetButton from '@/app/(main)/meet/EditMeetButton';
import { ClockIcon, MoreIcon, PeopleIcon } from '@/components/icon';
import { Meet } from '@prisma/client';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import DeleteButton from '../button/delete-button';
import { create } from 'domain';

function Modal({ meetId }: { meetId: string }) {
  return (
    <div className="bg-cardColor z-100 p-4 w-28 rounded-md absolute bottom-14 -left-8 transition-opacity">
      <div className="flex gap-1">
        <DeleteButton meetId={meetId} />
        <span className="text-sm">삭제하기</span>
      </div>
      <div className="flex gap-1">
        <EditMeetButton meetId={meetId} />
        <span className="text-sm">수정하기</span>
      </div>
      <div
        className="w-[30px] h-[30px] bg-cardColor absolute rotate-[315deg] rounded-[4px] left-1/3
          "
      ></div>
    </div>
  );
}

function MoreButton({ meetId }: { meetId: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <MoreIcon
        size={24}
        onClick={e => {
          e.preventDefault();
          setOpen(!open);
        }}
      />
      {open && <Modal meetId={meetId} />}
    </div>
  );
}

export default function MainCard({ meetInfo }: { meetInfo: Meet }) {
  function timeIntegerToTimeString(time: number) {
    const hour = Math.floor(time / 2);
    const minuteString = ((time % 2) * 30).toString().padStart(2, '0');
    if (hour >= 12) return `${hour - 12}:${minuteString} PM`;
    else return `${hour}:${minuteString} AM`;
  }

  return (
    <div
      className={`border-[0.5px] border-pointColor p-8 w-80 rounded-2xl shadow-2xl cursor-pointer hover:shadow-white/25 hover:shadow-lg -z-10`}
    >
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-lg font-semibold">{meetInfo.name}</h1>
        <MoreButton meetId={meetInfo.id} />
      </div>
      <h3 className="mb-2">{meetInfo.description}</h3>
      <div>
        <div className="flex items-center mb-2">
          <ClockIcon className="mr-1" />
          <span>{`${timeIntegerToTimeString(meetInfo.startTime)} - ${timeIntegerToTimeString(meetInfo.endTime)}`}</span>
        </div>
        {/* <div className="flex items-center">
          <PeopleIcon color="black" className="mr-1" />
          {participants.join(', ')}
        </div> */}
      </div>
    </div>
  );
}
