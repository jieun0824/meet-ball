'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { LeftIcon, RightIcon } from '@/components/icon';
import CalenderBody from './calendar-body';

export default function DateCalender() {
  const currentDay = dayjs();
  const [nowDate, setNowDate] = useState<string>(
    currentDay.format('YYYY-MM-DD')
  );
  const [selectedDate, setSelectedDate] = useState<string[]>([]);

  //select multiple dates
  const handleSelectedDate = (date: string) => {
    if (selectedDate.includes(date)) {
      const newArr = selectedDate.filter((a, i) => {
        return a != date;
      });
      setSelectedDate(newArr);
    } else {
      setSelectedDate([...selectedDate, date]);
    }
  };

  useEffect(() => {
    console.log(nowDate);
  }, [nowDate]);

  //function for setting calendar
  const handlePrevMonth = () => {
    const newDate = dayjs(nowDate)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD');
    setNowDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = dayjs(nowDate)
      .add(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    setNowDate(newDate);
  };

  return (
    <div>
      <div className="flex justify-between pb-7 pt-2 items-center">
        <span className="text-2xl font-bold">
          {dayjs(nowDate).format('YYYY년 MM월')}
        </span>
        <div className="flex">
          <LeftIcon onClick={handlePrevMonth} size={23} />
          <RightIcon onClick={handleNextMonth} size={23} />
        </div>
      </div>
      <div className="bg-cardColor w-full p-6 rounded-lg">
        <CalenderBody
          nowDate={nowDate}
          handleSelectedDate={handleSelectedDate}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  );
}
