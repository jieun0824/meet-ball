'use client';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { DateCalenderBtn } from './calendar-btn';
import CalendarDay from './calendar-day';

export default function CalenderBody({
  nowDate,
  handleSelectedDate,
  selectedDate,
}: {
  nowDate: string;
  handleSelectedDate: (date: string) => void;
  selectedDate: string[];
}) {
  const initArr = (firstDay: number, daysInMonth: number) => {
    return Array.from({ length: firstDay + daysInMonth }, (_, i) => {
      const currentDate = dayjs(nowDate)
        .startOf('month')
        .set('date', i - firstDay + 1);
      return i < firstDay ? null : currentDate.format('YYYY-MM-DD');
    });
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);

  useEffect(() => {
    const firstDay = dayjs(nowDate).startOf('month').day();
    const daysInMonth = dayjs(nowDate).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [nowDate]);

  const rows = [];
  for (let i = 0; i < arr.length; i += 7) {
    rows.push(arr.slice(i, i + 7));
  }

  const content = rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((date, colIndex) => (
        <td key={`${date || ''}${colIndex}`} className="p-1">
          {date && (
            <div onClick={() => handleSelectedDate(date)} className="">
              <DateCalenderBtn
                isSelected={selectedDate.includes(date)}
                isToday={dayjs().format('YYYY-MM-DD') === date}
                date={dayjs(date).date()}
              />
            </div>
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <table>
      <tbody>
        <CalendarDay />
        {content}
      </tbody>
    </table>
  );
}
