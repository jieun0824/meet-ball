// https://next-auth.js.org/getting-started/typescript#module-augmentation
import { User } from 'next-auth';

declare module 'next-auth' {
  interface AuthenticatedUser extends User {
    id: string;
  }
}
