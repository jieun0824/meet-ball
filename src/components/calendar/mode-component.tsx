'use client';
import { useState } from 'react';
import ModeButton from '@/components/button/mode-button';
import DateCalendar from '@/components/calendar/date-calendar';
import WeekCalendar from '@/components/calendar/week-calendar';

export default function ModeComponent() {
  const [mode, setMode] = useState<string>('요일');
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  return (
    <div className="mt-8 flex flex-col w-full max-w-[730px] mobile:max-w-[500px]">
      <div>
        <ModeButton
          title="요일"
          mode={mode}
          modeChange={() => handleModeChange('요일')}
        />
        <ModeButton
          title="날짜"
          mode={mode}
          modeChange={() => handleModeChange('날짜')}
        />
      </div>
      {mode == '날짜' ? <WeekCalendar /> : <DateCalendar />}
    </div>
  );
}
