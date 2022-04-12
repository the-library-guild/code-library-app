import { NextApiRequest, NextApiResponse } from 'next';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL as string;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, body } = req;

  const token = cookies['next-auth.session-token'];

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
