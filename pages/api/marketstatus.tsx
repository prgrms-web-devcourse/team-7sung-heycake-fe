import { AxiosResponse } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

import { publicApi } from '@/components/Api';

export default async function patchMarketStatus(
  request: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const { status, enrollmentId, token } = request.body;
    const { data }: AxiosResponse = await publicApi.patch(
      `/enrollments/${enrollmentId}`,
      {
        status,
      },
      {
        headers: {
          access_token: `${token}`,
        },
      }
    );
    return response.status(200).end(JSON.stringify(data));
  } catch (err) {
    return response.status(500).end(JSON.stringify(err));
  }
}
