import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function getMarketDetail(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { data }: AxiosResponse = await publicApi.get(
      `/enrollments/${request.query.id}`
    );
    return response.status(200).end(JSON.stringify(data));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
