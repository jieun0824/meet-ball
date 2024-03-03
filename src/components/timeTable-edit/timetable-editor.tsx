'use client';
import { useRef } from 'react';
import Button from '../button/button';
import TimeTableEditorColumn from '@/components/timeTable-edit/timetable-editor-column';
import { useParams, useRouter } from 'next/navigation';
import { updateTimeTable } from '@/controllers/meet';
import TimeTable from '../../../types/TimeTable';

export default function TimeTableEditor({
  startTime,
  endTime,
  datesOrDays,
  type,
  timeTable,
}: {
  startTime: number;
  endTime: number;
  datesOrDays: string[];
  type: 'DAYS' | 'DATES';
  timeTable: TimeTable;
}) {
  const router = useRouter();
  const timeTableRef = useRef<TimeTable>(timeTable);
  const meetId = useParams().meetId as string;
  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );

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
    <div className="flex flex-col justify-center items-center text-xs mt-16">
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
        {datesOrDays.map((date: string) => (
          <TimeTableEditorColumn
            key={date}
            date={date}
            startTime={startTime}
            endTime={endTime}
            type={type}
            timeTable={timeTableRef}
            colIdx={datesOrDays.indexOf(date)}
          />
        ))}
      </div>
      <Button
        title="저장하기"
        type="submit"
        onClick={async () => {
          await updateTimeTable(meetId, timeTableRef.current);
          router.push(`/meet/${meetId}`);
        }}
      />
    </div>
  );
}
