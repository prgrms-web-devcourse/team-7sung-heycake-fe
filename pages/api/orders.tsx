import { NextApiRequest, NextApiResponse } from 'next';

import letteringGangbok from '@/components/Api/mock/letteringGangbok.json';
import letteringGangnam from '@/components/Api/mock/letteringGangnam.json';
import photoGangbok from '@/components/Api/mock/photoGangbok.json';
import photoGangnam from '@/components/Api/mock/photoGangnam.json';

export default async function getCakeList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { location, category } = request.body;
  const cursur = request.query.id;

  if (category === 'photo') {
    if (location === 'gangnam') {
      return response
        .status(200)
        .end(JSON.stringify(photoGangnam.data.content));
    }
    if (location === 'gangbok') {
      return response
        .status(200)
        .end(JSON.stringify(photoGangbok.data.content));
    }
  }

  if (category === 'lettering') {
    if (location === 'gangnam') {
      return response
        .status(200)
        .end(JSON.stringify(letteringGangnam.data.content));
    }
    if (location === 'gangbok') {
      return response
        .status(200)
        .end(JSON.stringify(letteringGangbok.data.content));
    }
  }
  return response.status(500).end('err');
}
