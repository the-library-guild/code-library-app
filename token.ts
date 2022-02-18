import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";
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
function tokenFromRequest(req: NextRequest | NextApiRequest) {
  const { cookies } = req;
  const tokenStr = cookies["next-auth.session-token"];

  return verifyToken(tokenStr);
}
export { signToken, verifyToken, tokenFromRequest };
