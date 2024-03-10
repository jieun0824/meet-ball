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
  type?: 'submit' | 'reset' | 'button';
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        'max-w-[250px] cursor-pointer pr-10 pl-10 pt-2 pb-2 rounded-lg bg-pointColor text-black flex justify-center items-center active:bg-[#05957B] active:text-white',
        className
      )}
    >
      {title}
    </button>
  );
}
