import React, { useEffect } from "react";
import type { ReactElement } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Stack } from "@chakra-ui/react";

import { hasPerms } from "code-library-perms";

import { InternalPage } from "../layout/InternalPage";
import { Content } from "../layout/Content";
import { FullPageSpinner } from "./FullPageSpinner";

interface Props {
  requiredPermissions: number;
  children: ReactElement;
}

export function PageAuthorizer({ requiredPermissions, children }: Props) {
  const { push: redirectTo } = useRouter();
  const { data: session, status } = useSession();

  const userInfo = session?.user;
  const userPermissions = userInfo?.permsInt || 0;

  const isLoading = status === "loading";
  const couldNotBeAuthenticated = !isLoading && !userInfo;
  const permissionWasDenied = !hasPerms(userPermissions, requiredPermissions);

  useEffect(() => {
    if (isLoading) return;

    if (couldNotBeAuthenticated) {
      redirectTo("/login");
    }

    if (permissionWasDenied) {
      redirectTo("/permission-denied");
    }
  }, [isLoading, userInfo]);

  if (isLoading)
    return (
      <Content>
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <FullPageSpinner />
        </Stack>
      </Content>
    );

  return children;
}
