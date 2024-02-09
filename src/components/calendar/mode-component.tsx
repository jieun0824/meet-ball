'use client';
import { useState } from 'react';
import ModeButton from '../button/mode-button';
import DateCalendar from './date-calendar';
import WeekCalendar from './week-calendar';
import EventButton from '../button/event-button';
import Link from 'next/link';

export default function ModeComponent() {
  const [mode, setMode] = useState<string>('일반');
  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };
  return (
    <div className="mt-8 w-80 flex flex-col">
      <div>
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
      </div>
      {mode == '정기' ? <WeekCalendar /> : <DateCalendar />}
      <EventButton title={'🧆 미트볼 굴리기'} link={'/create'} />
    </div>
  );
}
