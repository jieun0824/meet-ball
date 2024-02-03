import Image from 'next/image';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <header className="relative flex justify-around items-center top-0 left-0 w-screen h-[10%] bg-[#1E1E1E] shadow-2xl">
        <div className="relative w-2/5 h-full mr-[40%]">
          <Image
            src="/icon/logo.png"
            alt="main logo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative w-1/10 ">
          <Image
            src="/icon/profile.svg"
            alt="profile logo"
            width={35}
            height={35}
          />
        </div>
      </header>
      <div className="relative w-screen h-screen">{children}</div>
    </>
  );
}