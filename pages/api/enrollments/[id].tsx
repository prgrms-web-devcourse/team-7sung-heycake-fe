import { NextApiRequest, NextApiResponse } from 'next';

import marketDetail from '@/components/Api/mock/marketDetail.json';

export default async function getMarketDetail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // enrollmentsId : request.query
  return response.status(200).end(JSON.stringify(marketDetail));
}
