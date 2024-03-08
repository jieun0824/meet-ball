'use client';

import { Prisma } from '@prisma/client';
import { participateMeet } from '@/controllers/meet';
import { useRouter } from 'next/navigation';
export default function ParticipateButton({ meetId }: { meetId: string }) {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        try {
          await participateMeet(meetId);
          router.push(`/meet/${meetId}`);
        } catch (error) {
          if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
              alert('이미 참여중인 meet 입니다.');
            }
          }
          alert('알 수 없는 에러가 발생하였습니다.');
          router.push('/');
        }
      }}
    >
      참가하기
    </button>
  );
}
