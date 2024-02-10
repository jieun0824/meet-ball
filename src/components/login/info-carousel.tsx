'use client';

import useCarousel from '@/hooks/useCarousel';
import InfoCard from './info-card';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

export default function InfoCarousel() {
  const { currentSlide, onMouseDown, onMouseUp, cardRef } = useCarousel(3, 320);
  return (
    <>
      <div className="mt-8 w-72 mb-4 overflow-hidden relative flex h-full">
        <div
          className="grid grid-cols-3 gap-80 font-semibold "
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          ref={cardRef}
        >
          <InfoCard />
        </div>
      </div>
      <button
        onClick={() => signIn('google')}
        className="flex justify-center items-center bg-white rounded-lg pr-4 pl-4 pt-2 pb-2"
      >
        <Image
          src="/icon/GoogleLogo.svg"
          alt="google logo"
          width={35}
          height={35}
        />
        <div className="text-black font-roboto ml-2">
          Google 계정으로 로그인
        </div>
      </button>
    </>
  );
}
