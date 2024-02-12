import { createDaysCookies } from '@/lib/actions';
import { getSession } from 'next-auth/react';
import { useTransition } from 'react';

export default function EventButton({
  title,
  meetingDays,
}: {
  title: string;
  meetingDays: string[] | Date[] | undefined;
}) {
  const [isPending, startTransition] = useTransition();
  const session = getSession();

  return (
    <button
      onClick={() => {
        if (meetingDays != undefined) {
          startTransition(() => createDaysCookies(meetingDays));
        }
      }}
      className="cursor-pointer pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black flex justify-center active:bg-[#05957B] active:text-white"
    >
      {title}
    </button>
  );
}
