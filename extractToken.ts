import type { NextApiRequest } from "next";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import jwt from "jsonwebtoken";

/*
  UNUSED: we use extractTokenManually over extractToken because it does not have any downsides and is not asynchronous
*/
async function extractToken(req: NextRequest | NextApiRequest) {
  try {
    const tokenStr = await getToken({
      req: req as any,
      secret: process.env.JWT_SECRET,
      raw: true,
    });
    return jwt.verify(tokenStr, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (err) {
    return null;
  }
}
function extractTokenManually(req: NextRequest | NextApiRequest) {
  try {
    const { cookies } = req;
    const tokenStr = cookies["next-auth.session-token"];

    return jwt.verify(tokenStr, process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (err) {
    return null;
  }
}
export default extractTokenManually;
