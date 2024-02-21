'use client';

import useCarousel from '@/hooks/useCarousel';
import InfoCard from './info-card';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import CarouselIndex from '../carousel-index';

export default function InfoCarousel({ session }: { session: any }) {
  const { currentSlide, onMouseDown, onMouseUp, cardRef } = useCarousel(
    3,
    320,
    true
  );
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-full">
      <div className="flex flex-col items-center mb-6">
        <Image src="/icon/logo.svg" alt="logo" width={200} height={100} />
        <div className="mt-8 w-72 relative overflow-hidden flex h-full">
          <div
            className="grid grid-cols-3 gap-80 font-semibold "
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            ref={cardRef}
          >
            <InfoCard />
          </div>
        </div>
        <CarouselIndex currentSlide={currentSlide} />
      </div>
      {session == undefined ? (
        <button
          onClick={() => signIn('google', {callbackUrl: '/'})}
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
      ) : (
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex justify-center items-center bg-white rounded-lg pr-4 pl-4 pt-2 pb-2"
        >
          <div className="text-black font-roboto">로그아웃</div>
        </button>
      )}
    </div>
  );
}
