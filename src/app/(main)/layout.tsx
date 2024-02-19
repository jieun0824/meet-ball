import Image from 'next/image';
import Link from 'next/link';

export default function Layout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <>
      <header className="relative flex justify-around items-center top-0 left-0 w-dvw h-[10%] bg-[#1E1E1E] shadow-2xl">
        <div className="relative w-2/5 h-full mr-[40%]">
          <Link href="/">
            <Image
              src="/icon/logo.svg"
              alt="main logo"
              width={200}
              height={100}
              className="relative -top-6 cursor-pointer"
              priority={false}
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
      {modal}
      <div className="w-dvw bg-bgColor">{children}</div>
    </>
  );
}
