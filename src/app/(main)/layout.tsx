import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="relative flex justify-around items-center top-0 left-0 w-dvw h-[10%] bg-[#1E1E1E] shadow-2xl">
        <div className="relative w-2/5 h-full mr-[40%]">
          <Link href="/">
            <Image
              src="/icon/logo.png"
              alt="main logo"
              fill
              className="object-cover"
            />
          </Link>
        </div>
        <div className="relative w-1/10">
          <Link href="/mypage">
            <Image
              src="/icon/profile.svg"
              alt="profile logo"
              width={35}
              height={35}
            />
          </Link>
        </div>
      </header>
      <div className="w-dvw h-dvh bg-bgColor">{children}</div>
    </>
  );
}
