import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="relative flex justify-around items-center top-0 left-0 w-dvw h-14 shadow-2xl">
        <div className="relative w-2/5 h-full mr-[40%]">
          <Link href="/">
            <Image
              src="/icon/logo.svg"
              alt="main logo"
              width={130}
              height={100}
              className="relative -top-4"
              priority={true}
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
      <div className="flex flex-col p-4">{children}</div>
    </>
  );
}
