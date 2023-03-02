import { publicApi } from '.';

export default async function postEnrollment(data: object) {
  try {
    await publicApi.post('/enrollments', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (error) {
    console.error(error);
  }
}
