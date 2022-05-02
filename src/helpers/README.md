# Helpers

## What's it for?

Helper functions (also referred to as utils) are small snippets of code that handle recurring tasks of the domain of our application.
Good examples are extracting cookies from a request, verifying the authenticity of a authentication token, etc.
Anything that comes in handy but cross the boundary of trivial and scoped computations can be placed in there.

## How can I work with it?

The following snippet can be found at `src/helpers/token.ts`

```ts
import { JWT } from 'next-auth/jwt';
import jwt from 'jsonwebtoken';

function signToken(tokenData: any) {
  return jwt.sign(tokenData, process.env.JWT_SECRET);
}

function verifyToken(tokenStr: unknown) {
  if (typeof tokenStr !== 'string') return null;

  try {
    return jwt.verify(tokenStr, process.env.JWT_SECRET) as JWT;
  } catch (err) {
    return null;
  }
}

export { signToken, verifyToken };
```
