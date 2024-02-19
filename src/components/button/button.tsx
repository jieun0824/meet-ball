'use client';
export default function Button({
  title,
  onClick = () => {},
  type,
}: {
  title: string;
  onClick?: () => void;
  type: 'submit' | 'reset' | 'button' | undefined;
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="cursor-pointer pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black flex justify-center items-center active:bg-[#05957B] active:text-white"
    >
      {title}
    </button>
  );
}
