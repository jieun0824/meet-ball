import DateCalender from '@/components/calendar/date-calendar';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function MainPage() {
  return (
    <div className="flex justify-center items-center">
      <DateCalender />
    </div>
  );
}
