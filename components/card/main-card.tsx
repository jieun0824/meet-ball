import EditMeetButton from '@/app/(main)/meet/_component/EditMeetButton';
import { ClockIcon, MoreIcon } from '../icon';
import { Meet } from '@prisma/client';
import { useState } from 'react';
import DeleteButton from '../button/delete-button';
import { cn } from '@/lib/utils';
import { FaCalendarCheck as CalendarIcon } from 'react-icons/fa';
import Link from 'next/link';
import TimeTable from '../../types/TimeTable';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

function MoreButton({
  meetId,
  pathName,
}: {
  meetId: string;
  pathName: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild className="absolute right-5 top-8 cursor-pointer">
        <MoreIcon size={24} />
      </PopoverTrigger>
      <PopoverContent className="w-28 !bg-opacity-20 border-none">
        <div className="flex gap-1">
          <DeleteButton meetId={meetId} pathName={pathName} />
          <span className="text-sm">삭제하기</span>
        </div>
        <div className="flex gap-1">
          <EditMeetButton meetId={meetId} />
          <span className="text-sm">수정하기</span>
        </div>
        {/* <div
          className="w-[30px] h-[30px] bg-cardColor absolute rotate-[315deg] rounded-[4px] left-1/3
          "
        ></div> */}
      </PopoverContent>
    </Popover>
  );
}

export default function MainCard({
  meet,
  isMyMeet,
  className,
  pathName,
}: {
  meet: Meet;
  isMyMeet?: boolean;
  className?: string;
  pathName: string;
}) {
  function timeIntegerToTimeString(time: number) {
    const hour = Math.floor(time / 2);
    const minuteString = ((time % 2) * 30).toString().padStart(2, '0');
    if (hour >= 12) return `${hour - 12}:${minuteString} PM`;
    else return `${hour}:${minuteString} AM`;
  }

  let confirmedTimeString = '';
  const confirmedTimeTable =
    meet.confirmedTimeTable !== null
      ? (meet.confirmedTimeTable as TimeTable)
      : null;
  if (
    confirmedTimeTable !== null &&
    Object.keys(confirmedTimeTable).length != 0
  ) {
    Object.keys(confirmedTimeTable).forEach(date => {
      if (confirmedTimeTable[date].length != 0) {
        confirmedTimeString += `${date}/ `;
        const length = confirmedTimeTable[date].length;
        confirmedTimeTable[date].forEach((time: number, index: number) => {
          if (index == 0)
            confirmedTimeString += `${timeIntegerToTimeString(time)} -`;
          if (index == length - 1)
            confirmedTimeString += ` ${timeIntegerToTimeString(time)}\n`;
        });
      }
    });
  }

  return (
    <Card className="relative !bg-opacity-30 !bg-cardColor/5 hover:scale-[0.98] transition !border-cardColor">
      <Link href={`/meet/${meet.id}`}>
        <CardHeader>
          <CardTitle>{meet.name}</CardTitle>
          <CardDescription>{meet.description}</CardDescription>
        </CardHeader>
      </Link>
      {isMyMeet && <MoreButton meetId={meet.id} pathName={pathName} />}
      <CardContent>
        {confirmedTimeString != '' ? (
          //when meeting is confirmed
          <p className="flex gap-1 items-center">
            <CalendarIcon className="mr-1" size={15} />
            <span>{confirmedTimeString}</span>
          </p>
        ) : (
          //when meeting is not confirmed
          <p className="flex gap-1 items-center">
            <ClockIcon className="mr-1" size={15} />
            <span>{`${timeIntegerToTimeString(meet.startTime)} - ${timeIntegerToTimeString(meet.endTime)}`}</span>
          </p>
        )}
      </CardContent>
      <CardFooter>
        {/* <p className="flex items-center">
      <PeopleIcon color="black" className="mr-1" />
      {meet.participants.join(', ')}</p> */}
      </CardFooter>
    </Card>
  );
}
