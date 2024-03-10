'use client';

import { useState } from 'react';

export default function TimeInput({
  inputName,
  defaultValue = 0,
}: {
  inputName: string;
  defaultValue?: number;
}) {
  const [hour, setHour] = useState(Math.floor(defaultValue / 2));
  const [minute, setMinute] = useState(defaultValue % 2 !== 0 ? 30 : 0);

  const handleHourChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newHour = Number(e.target.value);
    setHour(newHour);
    if (newHour === 24) setMinute(0);
  };
  const handleMinuteChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(Number(e.target.value));
  };

  return (
    <>
      <select
        name={`${inputName}Hour`}
        value={hour}
        className="bg-cardColor w-[60px] rounded-md text-pointColor"
        onChange={handleHourChange}
      >
        {Array.from(Array(25).keys()).map(hour => (
          <option key={hour} value={hour}>
            {hour}
          </option>
        ))}
      </select>
      <span> : </span>
      <select
        name={`${inputName}Minute`}
        value={minute}
        className="bg-cardColor w-[60px] rounded-md text-pointColor"
        onChange={handleMinuteChange}
      >
        <option value={0}>00</option>
        <option value={30} disabled={hour === 24}>
          30
        </option>
      </select>
    </>
  );
}
