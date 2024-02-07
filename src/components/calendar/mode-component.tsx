'use client';
import { useState } from 'react';
import ModeButton from '../button/mode-button';
import DateCalendar from './date-calendar';
import WeekCalendar from './week-calendar';

export default function ModeComponent() {
  const [mode, setMode] = useState<string>('일반');
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };
  return (
    <div className="mt-8 w-80">
      <ModeButton
        title="정기"
        mode={mode}
        modeChange={() => handleModeChange('정기')}
      />
      <ModeButton
        title="일반"
        mode={mode}
        modeChange={() => handleModeChange('일반')}
      />
      {mode == '정기' ? <WeekCalendar /> : <DateCalendar />}
    </div>
  );
}
