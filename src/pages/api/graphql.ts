import { NextApiRequest, NextApiResponse } from 'next';

import getConfig from 'next/config';

const config = getConfig();

const uri = config.serverRuntimeConfig.GRAPHQL_URL as string;

const cookieName = config.serverRuntimeConfig.IS_PROD
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, body } = req;

  const token = cookies[cookieName];

  const response = await fetch(uri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const responseAsJson = await response.json();

  res.status(200).json(responseAsJson);
}

export default handler;
