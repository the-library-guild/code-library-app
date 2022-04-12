import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cookies, body } = req;

  const token = cookies['next-auth.session-token'];

  const response = await fetch('http://localhost:4000/graphql', {
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
