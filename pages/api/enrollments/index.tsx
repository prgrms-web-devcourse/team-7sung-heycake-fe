import { NextApiRequest, NextApiResponse } from 'next';

import marketList from '@/components/Api/mock/marketList.json';

export default async function getMarketList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  return response.status(200).end(JSON.stringify(marketList));
}
