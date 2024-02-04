'use client';
import { useState } from 'react';
import { WeekCalenderBtn } from './calendar-btn';

export default function WeekCalendar() {
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  const [selectedWeek, setSelectedWeek] = useState<string[]>([]);
  //select multiple day
  const handleSelectedDate = (day: string) => {
    if (selectedWeek.includes(day)) {
      const newArr = selectedWeek.filter((a, i) => {
        return a != day;
      });
      setSelectedWeek(newArr);
    } else {
      setSelectedWeek([...selectedWeek, day]);
    }
  };

  return (
    <div className="bg-cardColor w-full p-6 rounded-lg flex mt-8">
      {day.map((a, i) => (
        <div key={a} className="w-10" onClick={() => handleSelectedDate(a)}>
          <WeekCalenderBtn day={a} isSelected={selectedWeek.includes(a)} />
        </div>
      ))}
    </div>
  );
}
