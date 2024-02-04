'use client';
import { useEffect, useState } from 'react';
import MainCard from './main-card';
import useCarousel from '@/hooks/useCarousel';
import { CarouselIndexIcon } from '../icon';

export default function MainCarousel({ title }: { title: string }) {
  const data = [
    {
      meetName: '회의1',
      description: '회의1',
      meetTime: '2023-01-23 ~ 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
    {
      meetName: '회의2',
      description: '회의2',
      meetTime: '2023-01-23 ~ 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
    {
      meetName: '회의3',
      description: '회의3',
      meetTime: '2023-01-23 ~ 2023-02-24',
      peopleInfo: '홍권, 박지은, 박태곤',
    },
  ];

  const { currentSlide, onMouseDown, onMouseUp } = useCarousel(3);

  useEffect(() => {
    console.log(currentSlide);
  }, [currentSlide]);

  return (
    <div className="mt-8">
      <div className="mb-[20px]">{title}</div>
      <div className="flex" onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <MainCard
          key={currentSlide}
          meetName={data[currentSlide].meetName}
          description={data[currentSlide].description}
          meetTime={data[currentSlide].meetTime}
          peopleInfo={data[currentSlide].peopleInfo}
        />
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
