'use client';
import { useState, useTransition } from 'react';
import { WeekCalenderBtn } from '@/components/calendar/calendar-btn';
import useMultiSelect from '@/hooks/useMultiSelect';
import Button from '../button/button';
import { createDaysCookies } from '@/controllers/meet';

export default function WeekCalendar() {
  const day = ['월', '화', '수', '목', '금', '토', '일'];

  const { selected: selectedDate, handleSelected: handleSelectedDate } =
    useMultiSelect<string>([]);
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col items-center">
      <div className="bg-cardColor p-6 rounded-lg flex mt-8 justify-evenly">
        {day.map((a, i) => (
          <div key={a} className="" onClick={() => handleSelectedDate(a)}>
            <WeekCalenderBtn day={a} isSelected={selectedDate.includes(a)} />
          </div>
        ))}
      </div>
      <Button
        type="button"
        title={'🧆 미트볼 굴리기'}
        onClick={() => {
          if (selectedDate != undefined) {
            startTransition(() =>
              createDaysCookies({ type: 'DAYS', meetingDays: selectedDate })
            );
          }
        }}
      />
    </div>
  );
}
