'use client';
import { Fragment, useEffect, useRef, useState, useTransition } from 'react';
import Button from '@/components/button/button';
import TimeColumn from '@/components/timetable/time-column';
import { useParams } from 'next/navigation';
import { updateTimeTable } from '@/controllers/meet';
import useSelectedCollection from '@/hooks/useSelectedCollection';
import { SelectableGroup } from 'react-selectable-fast';
import Selecto from 'react-selecto';

export type draggedArea = number[][];

interface TimeTable {
  current: {
    [key: string]: number[];
  };
}

export default function TimeTable({
  startTime,
  endTime,
  datesOrDays,
  type,
  userTimetable,
}: {
  startTime: number;
  endTime: number;
  datesOrDays: string[];
  type: 'DAYS' | 'DATES';

  userTimetable: {};
}) {
  const [isPending, startTransition] = useTransition();
  const [dragType, setDragType] = useState<'DELETE' | 'ADD' | undefined>(
    undefined
  );
  const {
    selectedCollection,
    setSelectedCollection,
    addHandler,
    deleteHandler,
  } = useSelectedCollection();

  const meetId = useParams().meetId as string;

  const timeList = Array.from(
    { length: endTime - startTime + 1 },
    (_, index) => startTime + index
  );
  type gridColumnsType = {
    [key: number]: string;
  };

  const gridSetList: gridColumnsType = {
    1: `grid grid-cols-1 selectedArea`,
    2: `grid grid-cols-2 selectedArea`,
    3: `grid grid-cols-3 selectedArea`,
    4: `grid grid-cols-4 selectedArea`,
    5: `grid grid-cols-5 selectedArea`,
    6: `grid grid-cols-6 selectedArea`,
    7: `grid grid-cols-7 selectedArea`,
  };
  useEffect(() => {
    setSelectedCollection({ ...selectedCollection, ...userTimetable });
    console.log(selectedCollection);
  }, []);

  return (
    <>
      <div className="grid grid-cols-table1 w-3/4">
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
        <Selecto
          dragContainer={'.cell'}
          selectableTargets={['.selectedArea .cell']}
          hitRate={0}
          selectByClick={true}
          selectFromInside={true}
          continueSelect={true}
          ratio={0}
          onSelect={e => {
            console.log(e.selected[0]);

            e.added.forEach(el => {
              if (
                e.added[0] == e.startAdded[0] &&
                selectedCollection[
                  e.startAdded[0].dataset.date as string
                ].includes(parseInt(e.added[0].dataset.time!))
              ) {
                setDragType('DELETE');
                console.log('DELETE');
              } else if (
                e.added[0] == e.startAdded[0] &&
                !selectedCollection[
                  e.startAdded[0].dataset.date as string
                ].includes(parseInt(e.added[0].dataset.time!))
              ) {
                setDragType('ADD');
                console.log('ADD');
              }

              if (dragType == 'DELETE') {
                console.log('delete mode');
                el.classList.remove('bg-pointColor', 'bg-opacity-35');
                deleteHandler(
                  el.dataset.date as string,
                  parseInt(el.dataset.time!)
                );
              } else {
                console.log('add mode');
                el.classList.add('bg-pointColor', 'bg-opacity-35');
                addHandler(
                  el.dataset.date as string,
                  parseInt(el.dataset.time!)
                );
              }
            });

            e.removed.forEach(el => {
              el.classList.remove('bg-pointColor', 'bg-opacity-35');
              deleteHandler(
                el.dataset.date as string,
                parseInt(el.dataset.time!)
              );
            });
          }}
        />
        <div className={gridSetList[datesOrDays.length % 7]}>
          {datesOrDays.map((date: string, i: number) => (
            <TimeColumn
              key={date}
              date={date}
              startTime={startTime}
              length={endTime - startTime + 1}
              type={type}
              colIdx={i}
              userTimetable={userTimetable}
            />
          ))}
        </div>
      </div>
      <Button
        title="저장하기"
        type="submit"
        onClick={async () => {
          await updateTimeTable(meetId, selectedCollection).then(() =>
            console.log('성공')
          );
        }}
      />
    </>
  );
}
