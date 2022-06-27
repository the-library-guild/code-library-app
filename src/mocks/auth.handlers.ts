import { rest } from 'msw';

import { DEFAULT_USER_PERMS_INT } from 'code-library-perms';

export const mockUser = {
  picture:
    'https://lh3.googleusercontent.com/a-/AOh14GjZEjXY1n-mNsmCnoYbEVgwh75kCOCpUeFYYJc0=s96-c',
  name: 'John Doe',
  email: 'john@email.com',
  permsInt: DEFAULT_USER_PERMS_INT,
  bookingLimit: 2,
  numOfBooksBorrowed: 0,
  exp: 123213139,
  iat: 123213139,
};

export const mockSession = {
  user: { ...mockUser },
  expires: new Date().toDateString(),
};

export const mockProviders = {
  credentials: {
    id: 'credentials',
    name: 'Credentials',
    type: 'credentials',
    authorize: null,
    credentials: null,
  },
};

export const mockCSRFToken = {
  csrfToken: 'auhsduahsudhasudhausdhausdhuasdhaushd',
};

export const mockCredentialsResponse = {
  ok: true,
  status: 200,
  url: 'https://path/to/credentials/url',
};

export const mockSignOutResponse = {
  ok: true,
  status: 200,
  url: 'https://path/to/signout/url',
};

export const authHandlers = [
  rest.post('/api/auth/signout', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockSignOutResponse))
  ),
  rest.get('/api/auth/session', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockSession))
  ),
  rest.get('/api/auth/csrf', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockCSRFToken))
  ),
  rest.get('/api/auth/providers', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockProviders))
  ),
  rest.post('/api/auth/callback/credentials', (req, res, ctx) =>
    res(ctx.status(200), ctx.json(mockCredentialsResponse))
  ),
  rest.post('/api/auth/_log', (req, res, ctx) => res(ctx.status(200))),
];
