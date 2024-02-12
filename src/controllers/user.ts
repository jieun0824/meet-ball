'use server';

import type { User } from 'next-auth';
import { getCurrentUser } from '@/lib/authentication';

export async function getMyInfo(): Promise<User> {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
