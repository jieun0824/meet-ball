import { auth } from '@/auth';
import { AuthenticatedUser } from 'next-auth';

export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const session = await auth();
  if (!session) throw Error('not logged in');
  const { user } = session;
  if (!user || !user.id) throw Error('corrupted session info');
  return user as AuthenticatedUser;
}
