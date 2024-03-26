'use client';
import InfoCard from '@/app/login/_component/info-card';
import Image from 'next/image';
import { signIn, signOut } from 'next-auth/react';
import Autoplay from 'embla-carousel-autoplay';
import { Session } from 'next-auth';
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

function GoogleLoginBtn({ session }: { session: Session | null }) {
  return (
    <>
      {session == undefined ? (
        <button
          onClick={() => signIn('google', { callbackUrl: '/' })}
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
    </>
  );
}

export default function InfoCarousel({ session }: { session: Session | null }) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 h-full">
      <div className="flex flex-col items-center mb-6 justify-center">
        <Image src="/icon/logo.svg" alt="logo" width={200} height={100} />
        <Carousel
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
          className="relative"
        >
          <CarouselContent>
            <InfoCard />
          </CarouselContent>
        </Carousel>
      </div>
      <GoogleLoginBtn session={session} />
    </div>
  );
}
