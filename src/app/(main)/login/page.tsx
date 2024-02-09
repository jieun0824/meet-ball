import { auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import InfoCarousel from '@/components/login/info-carousel';

//https://developers.google.com/identity/branding-guidelines?hl=ko <-design guidelines

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/'); // means already logged in
  return (
    <div className="flex flex-col justify-center items-center h-[80dvh]">
      <InfoCarousel />
      <Link
        href="/api/auth/signin/google"
        className="flex justify-center items-center bg-white rounded-lg pr-4 pl-4 pt-2 pb-2"
      >
        <Image
          src="/icon/GoogleLogo.svg"
          alt="google logo"
          width={35}
          height={35}
        />
        <div className="text-black font-roboto ml-2">
          Google 계정으로 로그인
        </div>
      </Link>
    </div>
  );
}
