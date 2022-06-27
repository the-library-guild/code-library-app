import NextAuth from 'next-auth';

import { JWT } from 'next-auth/jwt';

// https://next-auth.js.org/getting-started/typescript/

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: JWT & {
      email: string;
      name?: string;
      picture?: string;
      permsInt: number;
      bookingLimit: number;
      numOfBooksBorrowed: number;
      exp: number;
      iat: number;
    };
  }
}
declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    email: string;
    name?: string;
    picture?: string;
    permsInt: number;
    bookingLimit: number;
    exp: number;
    iat: number;
  }
}
