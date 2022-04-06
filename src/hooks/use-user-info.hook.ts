import { signOut, useSession } from "next-auth/react";

import { hasPerms } from "code-library-perms";

import { UserInfo } from "../components/Navbar";

export interface UserInfoValue {
  user: UserInfo;
  status: "authenticated" | "loading" | "unauthenticated";
  isLoading: boolean;
  isLoggedIn: boolean;

  hasPerms: (perm: number | number[]) => boolean;
}

export function useUserInfo(): UserInfoValue {
  const { data: session, status } = useSession();

  const isLoading = status === "loading";
  const isLoggedIn = status === "authenticated";

  const user = session?.user as UserInfo;

  if (!isLoading && !isLoggedIn) signOut();

  return {
    user,
    status,
    isLoading,
    isLoggedIn,
    hasPerms: (perm: number | number[]) => hasPerms(user?.permsInt, perm),
  };
}
