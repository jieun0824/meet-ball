'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import Button from '../button/button';
import TimeLine from './time-line';
import { useParams } from 'next/navigation';
import { updateTimeTable } from '@/controllers/meet';

interface TimeTable {
  current: {
    [key: string]: number[];
  };
}
export default function TimeTable({
  startTime,
  endTime,
  daysOrDates,
  type,
  userTimetable,
}: any) {
  const [isPending, startTransition] = useTransition();
  const timeTable: TimeTable = useRef(userTimetable);
  const meetId = useParams().meetId as string;
  return (
    <>
      {daysOrDates.map((date: string, i: number) => (
        <TimeLine
          key={date}
          date={date}
          startTime={startTime}
          endTime={endTime}
          type={type}
          timeTable={timeTable}
        />
      ))}
      <div className="row-span-1">
        <Button
          title="저장하기"
          type="submit"
          onClick={async () => {
            await updateTimeTable(meetId, timeTable.current);
          }}
        />
      </div>
    </>
  );
}
