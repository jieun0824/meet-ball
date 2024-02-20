import { Calendar } from '@/components/calendar/calendar';
import { useState, useTransition } from 'react';
import { createDaysCookies } from '@/controllers/meet';
import Button from '../button/button';

export default function DateCalendar() {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col items-center">
      <Calendar
        mode="multiple"
        selected={days}
        onSelect={setDays}
        className="rounded-md border"
      />
      <Button
        type="button"
        title={'🧆 미트볼 굴리기'}
        onClick={() => {
          if (days != undefined) {
            const meetingDays = days.map(a => a.toISOString().split('T')[0]); //change to iso
            startTransition(() =>
              createDaysCookies({ type: 'DATES', meetingDays: meetingDays })
            );
          }
        }}
      />
    </div>
  );
}
