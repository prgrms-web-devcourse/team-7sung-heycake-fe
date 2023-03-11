import ERROR_MESSAGES from '@/constants/errorMessages';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '.';

const ACCESS_TOKEN = getAccessToken();

export default async function postEnrollment(data: object) {
  if (ACCESS_TOKEN === null) {
    throw Error(ERROR_MESSAGES.CHECK_LOGIN);
  }
  try {
    await publicApi.post('/enrollments', data, {
      headers: {
        access_token: ACCESS_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    throw Error();
  }
}
