import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '.';

const ACCESS_TOKEN = getAccessToken();

export default async function postEnrollment(data: object) {
  if (ACCESS_TOKEN === null) {
    alert('로그인을 해주세요');
    return;
  }
  try {
    await publicApi.post('/enrollments', data, {
      headers: {
        access_token: ACCESS_TOKEN,
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(error);
  }
}
