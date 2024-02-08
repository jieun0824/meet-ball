'use client';
import { useState } from 'react';
import { WeekCalenderBtn } from './calendar-btn';
import useMultiSelect from '@/hooks/useMultiSelect';

export default function WeekCalendar() {
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  const { selected: selectedDate, handleSelected: handleSelectedDate } =
    useMultiSelect<string>([]);

  return (
    <div className="bg-cardColor w-full p-6 rounded-lg flex mt-8 justify-evenly">
      {day.map((a, i) => (
        <div key={a} className="" onClick={() => handleSelectedDate(a)}>
          <WeekCalenderBtn day={a} isSelected={selectedDate.includes(a)} />
        </div>
      ))}
    </div>
  );
}
