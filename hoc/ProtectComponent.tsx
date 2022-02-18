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
  // children: jsx.Element
  // UnAuthenticatedFallback: jsx.Element
  // UnAuthorizedFallback: jsx.Element
  children?: any;
  UnAuthenticatedFallback?: any;
  UnAuthorizedFallback?: any;
}
function RequirePerms({
  permsInt,
  children,
  UnAuthenticatedFallback = DefaultUnAuthenticatedFallback,
  UnAuthorizedFallback = DefaultUnAuthorizedFallback,
}: Props) {
  const { data, status } = useSession();

  const user = data?.user as any;
  const userPermsInt = user?.permsInt as any;

  const isAuthenticated = status === "authenticated";
  const isAuthorized = hasPerms(userPermsInt, permsInt);

  if (status === "loading") return null;
  if (!isAuthenticated) return <UnAuthenticatedFallback />;
  if (!isAuthorized) return <UnAuthorizedFallback />;

  return children;
}
function DefaultUnAuthenticatedFallback() {
  return <div>You need to be logged in to access this feature</div>;
}
function DefaultUnAuthorizedFallback() {
  return <div>You are not permitted to access this feature</div>;
}
export default RequirePerms;
