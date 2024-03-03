'use client';
import { useState } from 'react';
import useMultiSelect from '@/hooks/useMultiSelect';
import Button from '../button/button';
import { Calendar, WeekCalendar } from './calendar';
import { MeetType } from '@prisma/client';
import { useRouter } from 'next/navigation';

type ModeButtonProps = {
  isSelected: boolean;
  title: string;
  modeChange: () => void;
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

export default function DatesSelector() {
  const [mode, setMode] = useState<MeetType>(MeetType.DATES);
  const [selectedDates, setSelectedDates] = useState<Date[] | undefined>([]);
  const { selected: selectedDays, handleSelected: handleSelectedDays } =
    useMultiSelect<string>([]);
  // const [isPending, startTransition] = useTransition();
  // useEffect(() => {
  //   console.log(selectedDays);
  // }, [selectedDays]);

  const daysSortOrder: { [key: string]: number } = {
    월: 1,
    화: 2,
    수: 3,
    목: 4,
    금: 5,
    토: 6,
    일: 7,
  };
  const router = useRouter();

  return (
    <div className="mt-8 flex flex-col w-full max-w-[730px] mobile:max-w-[500px]">
      <ModeSelector mode={mode} handleModeChange={setMode} />
      <div className="flex flex-col items-center">
        {mode == MeetType.DAYS ? (
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
          onClick={async () => {
            let selections: string[] = [];

            if (mode == MeetType.DATES) {
              if (selectedDates == undefined || selectedDates.length == 0) {
                alert('You should select at least 1 date.');
                return;
              }
              selections = selectedDates
                .sort((a, b) => a.getTime() - b.getTime())
                .map(a => a.toISOString().split('T')[0]);
            } else if (mode == MeetType.DAYS) {
              if (selectedDays.length == 0) {
                alert('You should select at least 1 day.');
                return;
              }
              selections = selectedDays.sort(
                (a: string, b: string) => daysSortOrder[a] - daysSortOrder[b]
              );
            }
            try {
              localStorage.setItem(
                'selection',
                JSON.stringify({ mode, selections })
              );
              router.push('/create');
            } catch (error) {
              console.error(error);
            }
          }}
        />
      </div>
    </div>
  );
}
