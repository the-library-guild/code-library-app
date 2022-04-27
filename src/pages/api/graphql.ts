import { NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.GRAPHQL_URL as string;

const cookieName = process.env.IS_PROD
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, body } = req;

  const token = cookies[cookieName];

  try {
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
  } catch (error) {
    res.status(500).json(error);
  }
}

export default handler;
