'use client';
import { transformedParticipantsType } from '@/app/(main)/meet/[meetId]/page';
import { ReactElement, useEffect, useRef, useState } from 'react';

type timeComponentProps = {
  time: number;
  index: [number, number];
};

type dateParticipantsType = {
  [name: string]: Array<number>;
};

type timeOpacityType = {
  [name: string]: number;
};

type timeCellProps = {
  timeIndex: number;
  opacity: number;
  previousOpacity: number;
  nextOpacity: number;
  endTime: number;
};

function TimeCell({
  timeIndex,
  opacity,
  previousOpacity,
  nextOpacity,
  endTime,
}: timeCellProps) {
  return (
    <div
      style={{
        backgroundColor: `rgba(32, 236, 199, ${opacity})`,
      }}
      className={`h-[20px] cursor-pointer border-white ${timeIndex % 2 === 0 ? 'border-t-[0.3px]' : ''}
      ${previousOpacity === 0 && opacity != 0 && 'rounded-t-lg'} ${nextOpacity === 0 && opacity != 0 && 'rounded-b-lg'} `}
    ></div>
  );
}

export default function TimeColumn({
  date,
  startTime,
  endTime,
  type,
  dateParticipants,
  colIdx,
}: {
  date: string;
  startTime: number;
  endTime: number;
  type: 'DAYS' | 'DATES';
  dateParticipants: dateParticipantsType;
  colIdx: number;
}) {
  console.log(dateParticipants);
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

  const scheduleOpacityOfTimeObject: timeOpacityType = {};
  for (let i: number = startTime; i < endTime; i++) {
    let count = 0;
    for (const key in dateParticipants) {
      if (dateParticipants[key].includes(i)) {
        count++;
      }
    }
    scheduleOpacityOfTimeObject[String(i)] = count;
  }

  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label.current}
      </p>
      {/* {timeList.map((time: number, rowIdx: number) => {
        return <TimeCell key={rowIdx} time={time} index={[colIdx, rowIdx]} />;
      })} */}
      {Object.keys(scheduleOpacityOfTimeObject).map(
        (timeIndex: string, index: number) => {
          let previousOpacity = 0;
          let nextOpacity = 0;
          const opacity = scheduleOpacityOfTimeObject[timeIndex];

          if (
            parseInt(timeIndex) !== startTime &&
            parseInt(timeIndex) !== endTime - 1
          ) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)];
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)];
          } else if (parseInt(timeIndex) === startTime) {
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)];
            previousOpacity = 0;
          } else if (parseInt(timeIndex) === endTime - 1) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)];
            nextOpacity = 0;
          }

          return (
            <TimeCell
              key={index}
              timeIndex={parseInt(timeIndex)}
              opacity={
                +(opacity / Object.keys(dateParticipants).length).toFixed(2)
              }
              previousOpacity={previousOpacity}
              nextOpacity={nextOpacity}
              endTime={endTime}
            />
          );
        }
      )}
    </div>
  );
}
