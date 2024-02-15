'use client';
import { useState } from 'react';
import ModeButton from '@/components/button/mode-button';
import DateCalendar from '@/components/calendar/date-calendar';
import WeekCalendar from '@/components/calendar/week-calendar';

export default function ModeComponent() {
  const [mode, setMode] = useState<string>('일반');
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  return (
    <div className="mt-8 w-80 flex flex-col">
      <div>
        <ModeButton
          title="요일"
          mode={mode}
          modeChange={() => handleModeChange('정기')}
        />
        <ModeButton
          title="날짜"
          mode={mode}
          modeChange={() => handleModeChange('일반')}
        />
      </div>
      {mode == '정기' ? <WeekCalendar /> : <DateCalendar />}
    </div>
  );
}
