import Link from 'next/link';
import Image from 'next/image';
import { getMyInfo } from '@/controllers/user';
import { auth } from '@/auth';

function ProfileIcon({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt="profile icon"
      width={35}
      height={35}
      className="rounded-full"
    />
  );
}

export default async function Header() {
  const session = await auth();
  let myInfo = null;
  if (session) {
    myInfo = await getMyInfo();
  }
  return (
    <header className="z-10 w-full h-14 shadow-2xl px-4 flex justify-center">
      <div className="w-full max-w-6xl h-full flex justify-between items-center">
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
        {myInfo ? (
          <Link href="/mypage">
            <ProfileIcon src={myInfo.image ?? ''} />
          </Link>
        ) : (
          <Link href="/login">
            <Image
              src="/icon/profile.svg"
              alt="profile logo"
              width={35}
              height={35}
            />
          </Link>
        )}
      </div>
    </header>
  );
}
