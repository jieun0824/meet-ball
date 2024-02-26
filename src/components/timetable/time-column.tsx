'use client';
import { ReactElement, useEffect, useRef, useState } from 'react';
import { draggedArea } from './timetable';
import useDraggedArea from '@/hooks/useDraggedArea';
import useSelectedCollection from '@/hooks/useSelectedCollection';

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
  const {
    selectedCollection,
    setSelectedCollection,
    addHandler,
    deleteHandler,
  } = useSelectedCollection();
  const [clicked, setClicked] = useState(selected);

  const clickHandler = () => {
    if (clicked) {
      setClicked(false);
      deleteHandler(date, time);
    } else {
      setClicked(true);
      addHandler(date, time);
    }
  };

  //store dragged Area([[startCol, startRow], [endCol, endRow]]) by swr (global state)
  const [draggedArea, setDraggedArea] = useDraggedArea();

  const onMouseDownHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    await setDraggedArea([[date, time]]);
  };

  const onMouseUpHandler = async (event: React.MouseEvent) => {
    event.preventDefault();
    let newDraggedArea = [...draggedArea, [date, time]];
    await setDraggedArea(newDraggedArea).then(() => {
      const startCol = Object.keys(selectedCollection).indexOf(
        draggedArea[0][0]
      );
      const endCol = Object.keys(selectedCollection).indexOf(
        newDraggedArea[1][0]
      );
      if (selectedCollection[draggedArea[0][0]].includes(draggedArea[0][1])) {
        //deleteMode
        Object.keys(selectedCollection).forEach((date, i) => {
          if (i >= startCol && i <= endCol) {
            selectedCollection[date].forEach((time: number, i: number) => {
              if (time >= draggedArea[0][1] && time <= newDraggedArea[1][1]) {
                deleteHandler(date, time);
              }
            });
          }
        });
      } else {
        //addMode
        Object.keys(selectedCollection).forEach((date, i) => {
          if (i >= startCol && i <= endCol) {
            selectedCollection[date].forEach((time: number, i: number) => {
              if (time >= draggedArea[0][1] && time <= draggedArea[1][1]) {
                addHandler(date, time);
              }
            });
          }
        });
      }
    });
  };

  return (
    <div
      className={`h-[20px] cursor-pointer border-white ${time % 2 === 0 ? 'border-t-[0.3px]' : ''} ${clicked && 'bg-pointColor bg-opacity-35'}`}
      onClick={clickHandler}
      onMouseDown={onMouseDownHandler}
      onMouseUp={onMouseUpHandler}
    >
      {cellNum}
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
          key={rowIdx}
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
