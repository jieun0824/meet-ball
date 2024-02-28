'use server';

import type { AuthenticatedUser } from 'next-auth';
import { getCurrentUser } from '@/lib/authentication';
import prisma from '@/lib/prisma';

export async function getMyInfo(): Promise<AuthenticatedUser> {
  try {
    const currentUser = await getCurrentUser();
    return currentUser;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getUserIdsByEmails(emails: string[]): Promise<string[]> {
  try {
    const users = await prisma.user.findMany({
      where: {
        email: {
          in: emails,
        },
      },
    });
    return users.map(user => user.id);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
