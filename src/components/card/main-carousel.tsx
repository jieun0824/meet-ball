'use client';
import { useEffect, useRef, useState } from 'react';
import MainCard from './main-card';
import useCarousel from '@/hooks/useCarousel';
import { CarouselIndexIcon } from '../icon';

export default function MainCarousel({ title }: { title: string }) {
  const data = [
    {
      meetName: '회의1',
      description: '회의1',
      meetTime: '2023-01-23 - 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
    {
      meetName: '회의2',
      description: '회의2',
      meetTime: '2023-01-23 - 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
    {
      meetName: '회의3',
      description: '회의3',
      meetTime: '2023-01-23 - 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
  ];

  const { currentSlide, onMouseDown, onMouseUp, cardRef } = useCarousel(3);
  useEffect(() => {
    console.log(currentSlide);
  }, [currentSlide]);

  return (
    <div className="mt-8 w-96 h-72 overflow-hidden relative">
      <div className="mb-[20px]">{title}</div>
      <div
        className="grid grid-cols-3 gap-[400px]"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        ref={cardRef}
      >
        {data.map((a, i) => {
          return (
            <MainCard
              key={`side_num_${i}`}
              meetName={a.meetName}
              description={a.description}
              meetTime={a.meetTime}
              peopleInfo={a.peopleInfo}
              num={i}
            />
          );
        })}
      </div>
      <div className="flex justify-center p-4">
        <CarouselIndexIcon
          className={`mr-2 ${currentSlide == 0 ? 'text-gray-400' : 'text-gray-700'}`}
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
