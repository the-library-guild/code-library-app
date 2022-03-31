import { signOut, useSession } from "next-auth/react";

import { UserInfo } from ".";

interface UserInfoValue {
  user: UserInfo;
}

export function useUserInfo(): UserInfoValue {
  const { data: session } = useSession();

  const user = session?.user as UserInfo;

  if (!user) {
    signOut();
  }

  return { user };
}
