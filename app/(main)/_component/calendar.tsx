'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '../../../lib/utils';
import { LeftIcon, RightIcon } from '../../../components/icon';
import { ko } from 'date-fns/locale';

type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'p-4 border-none relative flex w-full',
        'before:absolute before:inset-0 before:top-16 before:bg-cardColor before:rounded-xl',
        className
      )}
      classNames={{
        months: 'flex flex-col space-y-4 z-10 w-full min-w-80',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center mb-8 z-12',
        caption_label: 'text-2xl font-bold ',
        nav: 'space-x-1 flex items-center relative ',
        table: 'w-full border-collapse space-y-1 ',
        head_row: 'flex  justify-evenly',
        head_cell: 'text-pointColor rounded-md min-w-9 font-bold text-[0.8rem]',
        row: 'flex w-full mt-2 justify-evenly',
        cell: 'min-h-9 min-w-9 text-center text-sm relative',
        day: 'min-h-8 min-w-8 font-normal aria-selected:opacity-100 rounded-[50%] hover:bg-gray-400',
        day_range_end: 'day-range-end',
        day_selected: '!bg-pointColor text-black hover:text-gray-50',
        day_today: 'bg-gray-500 text-gray-900',
        day_outside:
          'text-gray-500 opacity-50 aria-selected:bg-gray-100/50 aria-selected:text-gray-500 aria-selected:opacity-30',
        day_disabled: 'text-gray-500 opacity-50',
        day_range_middle:
          'aria-selected:bg-gray-100 aria-selected:text-gray-900',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <LeftIcon size={23} />,
        IconRight: ({ ...props }) => <RightIcon size={23} />,
      }}
      locale={ko}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

type WeekDaysProps = {
  selectedDays: string[];
  handleSelectedDays: (s: string) => void;
};

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

export { Calendar, WeekCalendar };
