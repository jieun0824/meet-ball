'use client';
import * as React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { LeftIcon, RightIcon } from '../../../public/icon/icon';

import CalenderBody from './calendar-body';
import CalendarHeader from './calendar-day';

const DateCalender = () => {
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

  const components = CalenderBody(selectedDay, handleSelectDate);

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
      <div className="flex justify-between">
        <span>
          {dayjs(selectedDay).year() +
            '년 ' +
            (dayjs(selectedDay).month() + 1) +
            '월'}
        </span>
        <div className="flex">
          <LeftIcon onClick={handlePrevMonth} />
          <RightIcon onClick={handleNextMonth} />
        </div>
      </div>
      <div>{components}</div>
      <div>
        <span>{selectedDay}</span>
      </div>
    </div>
  );
};

export default DateCalender;
