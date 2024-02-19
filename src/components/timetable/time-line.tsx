'use client';
import { useEffect, useRef, useState } from 'react';

type timeComponentProps = {
  time: number;
  length: number;
  selected: boolean;
  addHandler: () => void;
  deleteHandler: () => void;
};

function TimeComponent({
  time,
  length,
  selected,
  addHandler,
  deleteHandler,
}: timeComponentProps) {
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
      className={`h-[20px] border-white ${time % 2 === 0 ? 'border-t-[0.3px]' : ''} ${clicked && 'bg-pointColor bg-opacity-35'}`}
      onClick={clickHandler}
    ></div>
  );
}

export default function TimeLine({
  date,
  startTime,
  endTime,
  type,
  timeTable,
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
  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label.current}
      </p>
      {timeList.map((time: number, index: number) => (
        <TimeComponent
          key={time}
          time={time}
          length={endTime - startTime + 1}
          selected={timeTable.current[date].includes(time)}
          addHandler={() => timeTable.current[date].push(time)}
          deleteHandler={() =>
            timeTable.current[date].splice(
              timeTable.current[date].indexOf(time),
              1
            )
          }
        />
      ))}
    </div>
  );
}
