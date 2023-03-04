import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function getCakeList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { location, category, cursor } = request.body;
    const { data }: AxiosResponse = await publicApi.get(
      `/orders?region=${location}&cakeCategory=${category}&pageSize=10&cursorId=${cursor}`
    );
    return response.status(200).end(JSON.stringify(data));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
