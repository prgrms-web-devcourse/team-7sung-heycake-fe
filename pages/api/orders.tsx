import { NextApiRequest, NextApiResponse } from 'next';

import allGangnam from '@/components/Api/mock/allGangnam.json';
import letteringGangbok from '@/components/Api/mock/letteringGangbok.json';
import letteringGangnam from '@/components/Api/mock/letteringGangnam.json';
import photoGangbok from '@/components/Api/mock/photoGangbok.json';
import photoGangnam from '@/components/Api/mock/photoGangnam.json';

export default async function getCakeList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { location, category } = request.body;
  if (category === 'ALL') {
    return response.status(200).end(JSON.stringify(allGangnam.data.content));
  }

  if (category === 'PHOTO') {
    if (location === '강남구') {
      return response
        .status(200)
        .end(JSON.stringify(photoGangnam.data.content));
    }
    if (location === '강북구') {
      return response
        .status(200)
        .end(JSON.stringify(photoGangbok.data.content));
    }
  }

  if (category === 'LETTERING') {
    if (location === '강남구') {
      return response
        .status(200)
        .end(JSON.stringify(letteringGangnam.data.content));
    }
    if (location === '강북구') {
      return response
        .status(200)
        .end(JSON.stringify(letteringGangbok.data.content));
    }
  }
  return response.status(500).end('err');
}
