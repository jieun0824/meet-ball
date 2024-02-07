'use client';
import * as React from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/button/button';
import { LeftIcon, RightIcon } from '../icon';
import { ko } from 'date-fns/locale';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

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
        'p-4 flex justify-center items-center border-none relative',
        'before:absolute before:inset-0 before:top-16 before:bg-cardColor before:rounded-xl',
        className
      )}
      classNames={{
        months:
          'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 z-10',
        month: 'space-y-4',
        caption: 'flex justify-between pt-1 relative items-center mb-8 z-12',
        caption_label: 'text-2xl font-bold',
        nav: 'space-x-1 flex items-center relative',
        nav_button: '',
        nav_button_previous: '',
        nav_button_next: '',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-pointColor rounded-md w-9 font-bold text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-[50%]'
        ),
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

export { Calendar };
