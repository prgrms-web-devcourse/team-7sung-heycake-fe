import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function postMarketList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { cursor, category } = request.body;
    const { data }: AxiosResponse = await publicApi.get(
      `/enrollments/?pageSize=10&cursor=${cursor}&status=${category}`
    );
    return response.status(200).end(JSON.stringify(data));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
