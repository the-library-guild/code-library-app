import { NextApiRequest, NextApiResponse } from 'next';

import { tokenFromRequest } from '../../helpers/cookies';

const uri = process.env.GRAPHQL_URL as string;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  const token = tokenFromRequest(req);

  try {
    const response = await fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body || {}),
    });

    const responseAsJson = await response.json();

    res.status(200).json(responseAsJson);
  } catch (error) {
    res.status(500).json(error);
  }
}

export default handler;
