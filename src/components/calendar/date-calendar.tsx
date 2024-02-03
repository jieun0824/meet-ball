'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { LeftIcon, RightIcon } from '@/components/icon';
import CalenderBody from './calendar-body';

export default function DateCalender() {
  const currentDay = dayjs();
  const [selectedDay, setSelectedDay] = useState<string>(
    currentDay.format('YYYY-MM-DD')
  );

  const handleSelectDate = (day: string) => {
    setSelectedDay(day);
  };

  useEffect(() => {
    console.log(selectedDay);
  }, [selectedDay]);

  const handlePrevMonth = () => {
    const newDate = dayjs(selectedDay)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD');
    setSelectedDay(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(selectedDay)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    setSelectedDay(newDate);
  };

  return (
    <div className="">
      <div className="flex justify-between pb-7 pt-2 items-center">
        <span className="text-2xl font-bold">
          {dayjs(selectedDay).format('YYYY년 MM월')}
        </span>
        <div className="flex">
          <LeftIcon onClick={handlePrevMonth} size={23} />
          <RightIcon onClick={handleNextMonth} size={23} />
        </div>
      </div>
      <div className="bg-cardColor w-full p-6 rounded-lg">
        <CalenderBody
          selectedDay={selectedDay}
          handleSelectDate={handleSelectDate}
        />
      </div>
      {/* <div>
        <span>{selectedDay}</span>
      </div> */}
    </div>
  );
}
