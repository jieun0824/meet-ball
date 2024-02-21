'use client';
import { useEffect, useState, useTransition } from 'react';
import useMultiSelect from '@/hooks/useMultiSelect';
import Button from '../button/button';
import { createDaysCookies } from '@/controllers/meet';
import { Calendar } from './calendar';
import { MeetType } from '@prisma/client';

type ModeButtonProps = {
  isSelected: boolean;
  title: string;
  modeChange: () => void;
};

type WeekDaysProps = {
  selectedDays: string[];
  handleSelectedDays: (s: string) => void;
};

function ModeButton({ isSelected, title, modeChange }: ModeButtonProps) {
  return (
    <button
      onClick={modeChange}
      className={`rounded-xl pr-4 pl-4 pt-1 pb-1 ${isSelected ? 'bg-[#353945] opacity-100' : 'opacity-45'}`}
    >
      {title}
    </button>
  );
}

function ModeSelector({
  mode,
  handleModeChange,
}: {
  mode: string;
  handleModeChange: (newMode: MeetType) => void;
}) {
  return (
    <div>
      <ModeButton
        isSelected={mode === 'DAYS'}
        title="요일"
        modeChange={() => handleModeChange('DAYS')}
      />
      <ModeButton
        isSelected={mode === 'DATES'}
        title="날짜"
        modeChange={() => handleModeChange('DATES')}
      />
    </div>
  );
}

function WeekCalendar({ selectedDays, handleSelectedDays }: WeekDaysProps) {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  return (
    <div className="bg-cardColor p-6 rounded-lg flex mt-8 justify-evenly">
      {days.map((day, i) => (
        <div key={i} className="" onClick={() => handleSelectedDays(day)}>
          <div
            className={`cursor-pointer flex justify-center items-center rounded-2xl w-8 h-8 hover:bg-gray-400 ${
              selectedDays.includes(day) && '!bg-pointColor text-black'
            }`}
          >
            {day}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DatesSelector() {
  const [mode, setMode] = useState<MeetType>('DATES');
  const handleModeChange = (newMode: MeetType) => {
    setMode(newMode);
  };
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
  const { selected: selectedDays, handleSelected: handleSelectedDays } =
    useMultiSelect<string>([]);
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    console.log(selectedDays);
  }, [selectedDays]);

  const DaysOrder: { [key: string]: number } = {
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
    일: 7,
  };

  const cookieHandler = () => {
    let meetingDays: string[] = [];
    if (selectedDates != undefined && mode == 'DATES') {
      meetingDays = selectedDates
        .sort((a: any, b: any) => a - b)
        .map(a => a.toISOString().split('T')[0]);
    }
    if (selectedDays != undefined && mode == 'DAYS') {
      meetingDays = selectedDays.sort(
        (a: string, b: string) => DaysOrder[a] - DaysOrder[b]
      );
    }
    startTransition(() =>
      createDaysCookies({ type: mode, meetingDays: meetingDays })
    );
  };

  return (
    <div className="mt-8 flex flex-col w-full max-w-[730px] mobile:max-w-[500px]">
      <ModeSelector mode={mode} handleModeChange={handleModeChange} />
      <div className="flex flex-col items-center">
        {mode == 'DAYS' ? (
          <WeekCalendar
            selectedDays={selectedDays}
            handleSelectedDays={handleSelectedDays}
          />
        ) : (
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={setSelectedDates}
            className="rounded-md border"
          />
        )}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          title={'🧆 미트볼 굴리기'}
          onClick={cookieHandler}
        />
      </div>
    </div>
  );
}
