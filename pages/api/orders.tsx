import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function getCakeList(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { location, category } = request.body;
    const { data }: AxiosResponse = await publicApi.get(
      `/orders?region=${location}&cakeCategory=${category}&pageSize=200`
    );
    return response.status(200).end(JSON.stringify(data.content));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
