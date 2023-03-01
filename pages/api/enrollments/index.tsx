import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function getMarketList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { cursor } = request.body;
    const { data }: AxiosResponse = await publicApi.get(
      `/enrollments/?pageSize=10&cursor=${cursor}`
    );
    return response.status(200).end(JSON.stringify(data.enrollmentResponses));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
