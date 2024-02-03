import DateCalender from '@/components/calendar/date-calendar';
import Button from '@/components/common/button';
import dayjs from 'dayjs';
import { useState } from 'react';

export default function MainPage() {
  return (
    <div className="flex justify-center items-center flex-col">
      <DateCalender />
      <Button title={'+미트볼 생성하기'} />
    </div>
  );
}
