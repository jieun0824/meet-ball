'use client';

import { useRef, useState } from 'react';

export default function TimeComponent({
  time,
  length,
}: {
  time: number;
  length: number;
}) {
  const [selected, setSelected] = useState(false);
  const clickHandler = () => {
    if (selected) {
      setSelected(false);
    } else {
      setSelected(true);
    }
  };
  return (
    <div
      className={`h-[20px] border-white ${time % 2 === 0 ? 'border-t-[1px]' : ''} ${selected && 'bg-pointColor'}`}
      onClick={clickHandler}
    ></div>
  );
}
