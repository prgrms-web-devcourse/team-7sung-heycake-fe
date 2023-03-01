import { publicApi } from '.';

export default async function postEnrollment(data: object) {
  try {
    const response = await publicApi.post('/enrollments', data);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  //   console.log('in postEnrollment func', data);
}
