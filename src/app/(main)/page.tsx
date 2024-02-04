import DateCalender from '@/components/calendar/date-calendar';
import ModeComponent from '@/components/calendar/mode-component';
import WeekCalendar from '@/components/calendar/week-calendar';
import EventButton from '@/components/button/button';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function MainPage() {
  return (
    <div className="flex justify-center items-center flex-col">
      <ModeComponent />
      <EventButton title={'+미트볼 생성하기'} />
    </div>
  );
}
