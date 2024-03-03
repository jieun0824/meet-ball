'use client';
import { useEffect, useRef, useState } from 'react';

// type selectedArea = {
//   start: [startCol: number, startRow: number] | [];
//   end: [endCol: number, endRow: number] | [];
// };

type TimeTableEditorCellProps = {
  time: number;
  selected: boolean;
  addHandler: () => void;
  deleteHandler: () => void;
  index: [number, number];
};

function TimeTableEditorCell({
  time,
  selected,
  addHandler,
  deleteHandler,
  index,
}: TimeTableEditorCellProps) {
  const [clicked, setClicked] = useState(selected);
  const clickHandler = () => {
    if (clicked) {
      setClicked(false);
      deleteHandler();
    } else {
      setClicked(true);
      addHandler();
    }
  };

  return (
    <div
      className={`h-[20px] cursor-pointer border-white ${time % 2 === 0 ? 'border-t-[0.3px]' : ''} ${clicked && 'bg-pointColor bg-opacity-35'}`}
      onClick={clickHandler}
    >
      {/* {'col:' + index[0] + ' row:' + index[1]} */}
    </div>
  );
}

export default function TimeTableEditorColumn({
  date,
  startTime,
  endTime,
  type,
  timeTable,
  colIdx,
}: {
  date: string;
  startTime: number;
  endTime: number;
  type: 'DAYS' | 'DATES';
  timeTable: {
    current: {
      [key: string]: number[];
    };
  };
  colIdx: number;
}) {
  const timeList = Array.from(
    { length: endTime - startTime },
    (_, index) => startTime + index
  );
  const label = useRef('');
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

  useEffect(() => {
    console.log(timeTable.current);
  }, [timeTable.current]);

  // const [selectedAreaCollection, setSelectedAreaCollection] = useState<
  //   selectedArea[]
  // >([]);

  // useEffect(() => {
  //   console.log(selectedAreaCollection);
  // }, [selectedAreaCollection]);

  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label.current}
      </p>
      {timeList.map((time: number, rowIdx: number) => (
        <TimeTableEditorCell
          key={rowIdx}
          time={time}
          selected={timeTable.current[date].includes(time)}
          addHandler={() => timeTable.current[date].push(time)}
          deleteHandler={() =>
            timeTable.current[date].splice(
              timeTable.current[date].indexOf(time),
              1
            )
          }
          index={[colIdx, rowIdx]}
        />
      ))}
    </div>
  );
}
