'use server';

import type { AuthenticatedUser } from 'next-auth';
import { getCurrentUser } from '@/lib/authentication';

export async function getMyInfo(): Promise<AuthenticatedUser> {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
