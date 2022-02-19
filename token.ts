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
async function tokenFromRequest(req: NextRequest | NextApiRequest) {
  /* 
  some-fucking-thing in our production env changes the name of the next-auth jwt cookie
  next-auth themselves are probably not at fault, as this breaks their own getToken function
  */
  const cookieName =
    process.env.NODE_ENV === "production"
      ? "__Secure-next-auth.session-token"
      : "next-auth.session-token";

  const { cookies } = req;
  const tokenStr = cookies[cookieName];

  return verifyToken(tokenStr);
}
export { signToken, verifyToken, tokenFromRequest };
