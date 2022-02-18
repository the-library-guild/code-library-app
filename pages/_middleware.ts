// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { Perm, hasPerms } from "code-library-perms/dist";

import { tokenFromRequest } from "../token";

/*
on any request:
  if the route is an api endpoint, don't do anything
  if the user is not logged in, redirect to /login, except if the route already is /login
  if the user is logged in and the route is /login, redirect to /
  if the route is in PROTECTED_ROUTES and the user is missing the required permission, redirect to /auth-error
*/

const PROTECTED_ROUTES = {
  "/view-users": Perm.VIEW_USERS,
  "/view-books": Perm.VIEW_BOOKS,
};
const getRequiredPermsInt = (pathname: string) =>
  Object.entries(PROTECTED_ROUTES).reduce(
    (t, [route, permsInt]) =>
      pathname.startsWith(route) ? t + permsInt : permsInt,
    0
  );

async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/api/")) return NextResponse.next();

  const userData = tokenFromRequest(req);

  const isAuthenticated = userData != null;
  const userPermsInt = userData?.permsInt || 0;

  if (pathname === "/login") {
    return isAuthenticated ? NextResponse.redirect("/") : NextResponse.next();
  }
  const isAuthorized = hasPerms(userPermsInt, getRequiredPermsInt(pathname));

  if (!isAuthenticated) return NextResponse.redirect("/login");
  if (!isAuthorized) return NextResponse.redirect("/auth-error");

  return NextResponse.next();
}
export default middleware;
