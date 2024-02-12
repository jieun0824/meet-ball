import { POST, GET, auth } from '@/auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import InfoCarousel from '@/components/login/info-carousel';
import { signIn } from 'next-auth/react';
//https://developers.google.com/identity/branding-guidelines?hl=ko <-design guidelines

export default async function LoginPage() {
  const session = await auth();
  //if (session) redirect('/'); // means already logged in
  return <InfoCarousel session={session} />;
}
