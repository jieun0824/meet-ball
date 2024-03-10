'use client';

import { cn } from '@/lib/utils';

export default function Button({
  title,
  onClick = () => {},
  type,
  className,
}: {
  title: string;
  onClick?: () => void;
  type?: 'submit' | 'reset' | 'button' | undefined;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'max-w-[250px] cursor-pointer px-10 py-2 rounded-lg bg-pointColor text-black flex justify-center items-center active:bg-[#05957B] active:text-white',
        className
      )}
    >
      {title}
    </button>
  );
}
