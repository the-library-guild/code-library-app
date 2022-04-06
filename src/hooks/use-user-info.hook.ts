import { signOut, useSession } from "next-auth/react";

import { hasPerms } from "code-library-perms";

import type { JWT } from "next-auth/jwt";

export interface UserInfoValue {
  user: JWT;
  status: "authenticated" | "loading" | "unauthenticated";
  isLoading: boolean;
  isLoggedIn: boolean;

  hasPerms: (perm: number | number[]) => boolean;
}

export function useUserInfo(): UserInfoValue {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  const user = session?.user as JWT;

  if (!isLoading && !isLoggedIn) signOut();

  return {
    user,
    status,
    isLoading,
    isLoggedIn,
    hasPerms: (perm: number | number[]) => hasPerms(user?.permsInt, perm),
  };
}
