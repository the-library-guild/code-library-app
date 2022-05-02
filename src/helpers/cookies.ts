export const cookieName = process.env.IS_PROD
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

interface RequestWithCookies {
  cookies: {
    [key: string]: string;
  };
}

export function tokenFromRequest({ cookies }: RequestWithCookies) {
  if (Object.keys(cookies).includes(cookieName)) {
    return cookies[cookieName];
  }

  throw Error(`Could not find authorization cookies ${cookieName}.`);
}
