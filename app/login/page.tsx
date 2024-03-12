import { auth } from '@/auth';
import InfoCarousel from './_component/info-carousel';
//https://developers.google.com/identity/branding-guidelines?hl=ko

export default async function LoginPage() {
  const session = await auth();
  return <InfoCarousel session={session} />;
}
