import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

function signToken(tokenData: any) {
  return jwt.sign(tokenData, process.env.JWT_SECRET);
}
function verifyToken(tokenStr: unknown) {
  if (typeof tokenStr !== "string") return null;

  try {
    return jwt.verify(tokenStr, process.env.JWT_SECRET) as JWT;
  } catch (err) {
    return null;
  }
}
async function tokenFromRequest(req: NextRequest | NextApiRequest) {
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const { cookies } = req;
  const tokenStr = cookies[cookieName];

  console.log("cookieName:", cookieName);
  console.log("cookie:", tokenStr);

  return verifyToken(tokenStr);

  // return await getToken({ req: req as any, secret: process.env.JWT_SECRET });
}
export { signToken, verifyToken, tokenFromRequest };
