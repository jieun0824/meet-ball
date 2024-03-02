'use client';
import { transformedParticipantsType } from '@/app/(main)/meet/[meetId]/page';
import { ReactElement, useEffect, useRef, useState } from 'react';

type dateParticipantsType = {
  [name: string]: Array<number>;
};

type timeOpacityType = {
  [name: string]: string[];
};

type timeCellProps = {
  timeIndex: number;
  opacity: number;
  previousOpacity: number;
  nextOpacity: number;
  endTime: number;
  setHoverData: (data: string[]) => void;
  participants: string[];
};

function TimeCell({
  timeIndex,
  opacity,
  previousOpacity,
  nextOpacity,
  endTime,
  setHoverData,
  participants,
}: timeCellProps) {
  return (
    <div
      style={{
        backgroundColor: `rgba(32, 236, 199, ${opacity})`,
      }}
      onMouseOver={() => setHoverData(participants)}
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
  dateTimetable,
  colIdx,
  setHoverData,
}: {
  date: string;
  startTime: number;
  endTime: number;
  type: 'DAYS' | 'DATES';
  dateTimetable: dateParticipantsType;
  colIdx: number;
  setHoverData: (data: string[]) => void;
}) {
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
    let participant: string[] = [];
    for (const key in dateTimetable) {
      if (dateTimetable[key].includes(i)) {
        participant = [...participant, key];
      }
    }
    scheduleOpacityOfTimeObject[String(i)] = participant;
  }

  return (
    <div>
      <p className="flex justify-center whitespace-pre-wrap h-[30px]">
        {label.current}
      </p>
      {Object.keys(scheduleOpacityOfTimeObject).map(
        (timeIndex: string, index: number) => {
          let previousOpacity = 0;
          let nextOpacity = 0;
          const opacity = scheduleOpacityOfTimeObject[timeIndex].length;

          if (
            parseInt(timeIndex) !== startTime &&
            parseInt(timeIndex) !== endTime - 1
          ) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)]
                .length;
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)]
                .length;
          } else if (parseInt(timeIndex) === startTime) {
            nextOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) + 1)]
                .length;
            previousOpacity = 0;
          } else if (parseInt(timeIndex) === endTime - 1) {
            previousOpacity =
              scheduleOpacityOfTimeObject[String(parseInt(timeIndex) - 1)]
                .length;
            nextOpacity = 0;
          }

          return (
            <TimeCell
              key={index}
              timeIndex={parseInt(timeIndex)}
              opacity={
                +(opacity / Object.keys(dateTimetable).length).toFixed(2)
              }
              previousOpacity={previousOpacity}
              nextOpacity={nextOpacity}
              endTime={endTime}
              setHoverData={(data: string[]) => setHoverData(data)}
              participants={scheduleOpacityOfTimeObject[timeIndex]}
            />
          );
        }
      )}
    </div>
  );
}
