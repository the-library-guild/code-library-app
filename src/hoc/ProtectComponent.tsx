import type { ReactElement } from "react";

import { useSession } from "next-auth/react";

import { hasPerms } from "code-library-perms";
/*
this higher order component returns
UnAuthenticatedFallback if the user is not logged in
UnAuthorizedFallback if permsInt !== 0 and the user is missing the permission
or its protected content if neither condition is met
*/
interface Props {
  permsInt: number;
  children: ReactElement;
}

function RequirePerms({
  permsInt,
  children,
}: Props) {
  const { data, status } = useSession();

  const user = data?.user;
  const userPermsInt = user?.permsInt || 0;

  const isAuthenticated = status === "authenticated";
  const isAuthorized = hasPerms(userPermsInt, permsInt);

  if (status === "loading") return null;
  if (!isAuthenticated) return <UnauthenticatedPage />;
  if (!isAuthorized) return <UnauthorizedPage />;

  return children;
}

function UnauthenticatedPage() {
  return <div>You need to be logged in to access this feature</div>;
}

function UnauthorizedPage() {
  return <div>You are not permitted to access this feature</div>;
}

export default RequirePerms;
