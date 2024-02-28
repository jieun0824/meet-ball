'use client';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { draggedArea } from './timetable';
import useDraggedArea from '@/hooks/useDraggedArea';
import useSelectedCollection from '@/hooks/useSelectedCollection';
import {
  createSelectable,
  SelectAll,
  DeselectAll,
} from 'react-selectable-fast';

type timeComponentProps = {
  time: number;
  index: [number, number];
  date: string;
  selected?: boolean;
  startTime: number;
  cellNum: number;
  length: number;
};

function TimeCell({
  time,
  index,
  date,
  selected,
  cellNum,
  length,
  startTime,
}: timeComponentProps) {
  const [clicked, setClicked] = useState(selected);

  const {
    selectedCollection,
    setSelectedCollection,
    addHandler,
    deleteHandler,
  } = useSelectedCollection();
  const ref = useRef(null);

  return (
    <div
      data-time={time}
      data-date={date}
      ref={ref}
      className={`cell h-[20px] cursor-pointer border-white ${time % 2 === 0 ? 'border-t-[0.3px]' : ''} ${clicked && 'bg-pointColor bg-opacity-35'}`}
    >
      {time}
    </div>
  );
}

export default function TimeColumn({
  date,
  startTime,
  type,
  colIdx,
  userTimetable,
  length,
}: {
  date: string;
  startTime: number;
  type: 'DAYS' | 'DATES';
  colIdx: number;
  userTimetable: { [key: string]: number[] };
  length: number;
}) {
  const timeList = Array.from(
    { length: length },
    (_, index) => startTime + index
  );
  const label = useRef<string>('');

  const days = ['월', '화', '수', '목', '금', '토', '일'];
  if (type == 'DATES') {
    const newdate = new Date(date);
    label.current =
      newdate.getMonth() +
      1 +
      '/' +
      newdate.getDate() +
      ' ' +
      days[newdate.getDay()];
  } else {
    label.current = date;
  }

  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label.current}
      </p>
      {timeList.map((time: number, rowIdx: number) => (
        <TimeCell
          key={time}
          time={time}
          index={[colIdx, rowIdx]}
          startTime={startTime}
          date={date}
          selected={userTimetable[date].includes(time)}
          cellNum={colIdx * length + rowIdx}
          length={length}
        />
      ))}
    </div>
  );
}
