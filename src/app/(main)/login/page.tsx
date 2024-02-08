import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  if (session) redirect('/'); // means already logged in
  return <div>
    <a href="/api/auth/signin/google">Login With Google</a>
  </div>;
}
