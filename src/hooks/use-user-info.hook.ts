import { signOut, useSession } from 'next-auth/react';

import { hasPerms, Perm } from 'code-library-perms';

import type { JWT } from 'next-auth/jwt';
import {
  LIBRARIAN_VIEW,
  STUDENT_VIEW,
  useMakingAppContext,
} from '../making-app-context';

export type AppUser = JWT & {
  role: UserRole;
};

export const STUDENT_ROLE = 'student';
export const LIBRARIAN_ROLE = 'librarian';
export const ADMIN_ROLE = 'admin';

export type UserRole =
  | typeof STUDENT_ROLE
  | typeof LIBRARIAN_ROLE
  | typeof ADMIN_ROLE;
export interface UserInfoValue {
  user: AppUser;
  status: 'authenticated' | 'loading' | 'unauthenticated';
  isLoading: boolean;
  isLoggedIn: boolean;

  hasPerms: (perm: number | number[]) => boolean;
}

export function useUserInfo(): UserInfoValue {
  const { data: session, status } = useSession();

  const { currentView } = useMakingAppContext();

  const isLoading = status === 'loading';
  const isLoggedIn = status === 'authenticated';

  if (!isLoading && !isLoggedIn) signOut();

  let infoFromToken: JWT;
  switch (currentView) {
    case STUDENT_VIEW:
      infoFromToken = {
        ...session?.user,
        permsInt: Perm.RENT_BOOKS,
      } as JWT;
      break;
    case LIBRARIAN_VIEW:
      infoFromToken = {
        ...session?.user,
        permsInt: Perm.MANAGE_BOOKS,
      } as JWT;
      break;
    default:
      infoFromToken = session?.user as JWT;
  }

  const roleFromPermissions = (permissions: number): UserRole => {
    switch (permissions) {
      case Perm.MANAGE_BOOKS:
        return LIBRARIAN_ROLE;
      case Perm.MANAGE_USERS:
        return ADMIN_ROLE;
      default:
        return STUDENT_ROLE;
    }
  };

  const user = {
    ...infoFromToken,
    role: roleFromPermissions(infoFromToken?.permsInt),
  };

  // eslint-disable-next-line no-console
  console.dir(user);

  return {
    user,
    status,
    isLoading,
    isLoggedIn,
    hasPerms: (perm: number | number[]) => hasPerms(user?.permsInt, perm),
  };
}
