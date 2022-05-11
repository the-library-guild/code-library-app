import { JWT } from 'next-auth/jwt';

import { nanoid } from 'nanoid';

import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

async function signToken(tokenData: any) {
  return await new SignJWT({ ...tokenData })
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .sign(secret);
}

async function verifyToken(tokenStr: unknown) {
  if (typeof tokenStr !== 'string') return null;

  try {
    const verified = await jwtVerify(tokenStr, secret);
    return verified.payload as JWT;
  } catch (err) {
    return null;
  }
}

export { signToken, verifyToken };
