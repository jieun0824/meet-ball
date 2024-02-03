'use client';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import CalenderBtn from './calendar-btn';
import CalendarDay from './calendar-day';

const CalenderBody = ({
  selectedDay,
  handleSelectDate,
}: {
  selectedDay: string;
  handleSelectDate: (date: string) => void;
}) => {
  const initArr = (firstDay: number, daysInMonth: number) => {
    return Array.from({ length: firstDay + daysInMonth }, (_, i) => {
      const currentDate = dayjs(selectedDay)
        .startOf('month')
        .set('date', i - firstDay + 1);
      return i < firstDay ? null : currentDate.format('YYYY-MM-DD');
    });
  };

  const [arr, setArr] = useState<(string | null)[]>([null]);

  useEffect(() => {
    const firstDay = dayjs(selectedDay).startOf('month').day();
    const daysInMonth = dayjs(selectedDay).daysInMonth();
    setArr(initArr(firstDay, daysInMonth));
  }, [selectedDay]);

  const rows = [];
  for (let i = 0; i < arr.length; i += 7) {
    rows.push(arr.slice(i, i + 7));
  }

  const content = rows.map((row, rowIndex) => (
    <tr key={rowIndex}>
      {row.map((date, colIndex) => (
        <td key={`${date || ''}${colIndex}`}>
          {date && (
            <div onClick={() => handleSelectDate(date)}>
              <CalenderBtn
                isSelected={selectedDay === date}
                date={dayjs(date).date()}
              />
            </div>
          )}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="bg-cardColor w-full p-4 rounded-lg">
      <table className="table-auto">
        <tbody>
          <CalendarDay />
          {content}
        </tbody>
      </table>
    </div>
  );
};

export default CalenderBody;
