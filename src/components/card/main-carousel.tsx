'use client';
import { useEffect, useRef, useState } from 'react';
import MainCard from '@/components/card/main-card';
import useCarousel from '@/hooks/useCarousel';
import { CarouselIndexIcon } from '@/components/icon';
import { FaCircle } from 'react-icons/fa6';

type scheduleData = {
  meet_id: number;
  title: string;
  manager: string;
  manager_id: number;
  participants: string[];
  description: string;
  time_range: string[];
};

export default function MainCarousel({
  title,
  data,
}: {
  title: string;
  data: scheduleData[];
}) {
  const { currentSlide, onMouseDown, onMouseUp, cardRef } = useCarousel(
    3,
    400,
    false
  );
  useEffect(() => {
    console.log(currentSlide);
  }, [currentSlide]);

  return (
    <div className="mt-8 w-80 mb-4 overflow-hidden relative">
      <div className="mb-[20px]">{title}</div>
      <div
        className="grid grid-cols-3 gap-[400px] h-52"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={cardRef}
      >
        {data.map((schedule: scheduleData, i: number) => {
          return (
            <MainCard
              key={`side_num_${i}`}
              meetName={schedule.title}
              description={schedule.description}
              meetTime={schedule.time_range}
              participants={schedule.participants}
              num={i}
            />
          );
        })}
      </div>
      <div className="flex justify-center p-4">
        <CarouselIndexIcon
          className={`mr-2 top-2 ${currentSlide == 0 ? 'text-gray-400' : 'text-gray-700'}`}
          size={8}
        />
        <CarouselIndexIcon
          className={`mr-2 ${currentSlide == 1 ? 'text-gray-400' : 'text-gray-700'}`}
          size={8}
        />
        <CarouselIndexIcon
          className={`${currentSlide == 2 ? 'text-gray-400' : 'text-gray-700'}`}
          size={8}
        />
      </div>
    </div>
  );
}
