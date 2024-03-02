'use client';
import { useEffect, useRef, useState, useTransition } from 'react';
import Button from '../button/button';
import TimeColumn from '@/components/timeTable/time-column';
import { useParams } from 'next/navigation';
import { updateTimeTable } from '@/controllers/meet';
import { transformedParticipantsType } from '@/app/(main)/meet/[meetId]/page';

interface TimeTable {
  current: {
    [key: string]: number[];
  };
}

type TimeTableProps = {
  startTime: number;
  endTime: number;
  datesOrDays: string[];
  type: 'DAYS' | 'DATES';
  timetable: transformedParticipantsType;
  participantsNum: number;
};

export default function TimeTable({
  startTime,
  endTime,
  datesOrDays,
  type,
  timetable,
  participantsNum,
}: TimeTableProps) {
  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );
  const [hoverData, setHoverData] = useState<string[]>([]);

  type gridColumnsType = {
    [key: number]: string;
  };

  const gridSetList: gridColumnsType = {
    1: `grid grid-cols-table1 w-full`,
    2: `grid grid-cols-table2 w-full`,
    3: `grid grid-cols-table3 w-full`,
    4: `grid grid-cols-table4 w-full`,
    5: `grid grid-cols-table5 w-full`,
    6: `grid grid-cols-table6 w-full`,
    7: `grid grid-cols-table7 w-full`,
  };

  return (
    <div className="flex mobile:flex-col justify-center items-start mobile:items-center text-xs mt-16 mb-16">
      <div className={gridSetList[datesOrDays.length % 7]}>
        <div className="flex flex-col items-end">
          <div className="min-h-[30px] mr-2 -mt-2">
            <p>week</p>
          </div>
          {timeList.map((time: number, index: number) => {
            const tempHour = Math.floor(time / 2);
            return (
              <div key={index} className="min-h-[20px] mr-2">
                {time % 2 === 0 ? (
                  <p className="text-xs">{`${tempHour}:00`}</p>
                ) : (
                  (index == endTime - startTime || index == 0) && (
                    <p className="text-xs">{`${tempHour}:30`}</p>
                  )
                )}
              </div>
            );
          })}
        </div>

        {datesOrDays.map((date: string, i: number) => (
          <TimeColumn
            key={date}
            date={date}
            startTime={startTime}
            endTime={endTime}
            type={type}
            dateTimetable={timetable[date]}
            colIdx={datesOrDays.indexOf(date)}
            setHoverData={(data: string[]) => setHoverData(data)}
          />
        ))}
      </div>
      <div className="bg-cardColor w-3/4 rounded-lg p-6 mt-8 text-[16px] flex flex-col gap-4 m-10">
        <p>
          응답자: {hoverData.length}/{participantsNum}
        </p>
        {hoverData.map(data => (
          <p>{data}</p>
        ))}
      </div>
    </div>
  );
}
