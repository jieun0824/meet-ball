import NextAuth, { User } from 'next-auth';

declare module 'next-auth' {
  interface AuthenticatedUser extends User {
    id: string;
  }
}
