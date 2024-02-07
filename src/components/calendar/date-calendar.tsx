import { Calendar } from '@/components/calendar/calendar';
import { useState } from 'react';

export default function DateCalendar() {
  const initialDays: Date[] = [];
  const [days, setDays] = useState<Date[] | undefined>(initialDays);
  return (
    <Calendar
      mode="multiple"
      selected={days}
      onSelect={setDays}
      className="rounded-md border"
    />
  );
}
