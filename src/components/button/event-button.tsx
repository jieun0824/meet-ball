import Link from 'next/link';

export default function EventButton({
  title,
  link,
}: {
  title: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="pr-10 pl-10 pt-2 pb-2 m-4 rounded-lg bg-pointColor text-black flex justify-center active:bg-[#05957B] active:text-white"
    >
      {title}
    </Link>
  );
}
