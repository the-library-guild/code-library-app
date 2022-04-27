import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { FullPageSpinner } from './FullPageSpinner';
import { AppUser, useUserInfo } from '../hooks/use-user-info.hook';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';

interface Props {
  requiredPermissions: number;
  children: (props: PageAuthorizerRenderProps) => ReactJSXElement;
}

interface PageAuthorizerRenderProps {
  user: AppUser;
  hasRequiredPermissions: boolean;
}

export function PageAuthorizer({ requiredPermissions, children }: Props) {
  const { push: redirectTo } = useRouter();
  const { user, isLoading, isLoggedIn, hasPerms } = useUserInfo();
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoggedIn) redirectTo('/login');

    if (isLoggedIn && hasPerms(requiredPermissions)) {
      setPermissionDenied(false);
    } else {
      setPermissionDenied(true);
    }
  }, [
    hasPerms,
    isLoading,
    isLoggedIn,
    redirectTo,
    requiredPermissions,
    setPermissionDenied,
  ]);

  if (isLoading) return <FullPageSpinner />;

  return children({ user, hasRequiredPermissions: !permissionDenied });
}
