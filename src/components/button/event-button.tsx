import { createDaysCookies } from '@/controllers/meet';
import { getSession } from 'next-auth/react';
import { useTransition } from 'react';

export default function EventButton({
  title,
  meetingDays,
  type,
}: {
  title: string;
  meetingDays: string[] | undefined;
  type: 'DAYS' | 'DATES';
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        if (meetingDays != undefined) {
          startTransition(() =>
            createDaysCookies({ type: type, meetingDays: meetingDays })
          );
        }
      }}
      className="cursor-pointer pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black flex justify-center active:bg-[#05957B] active:text-white"
    >
      {title}
    </button>
  );
}
