/* eslint-disable consistent-return */
import internalApi from '.';

export default async function getMarketDetail() {
  try {
    // enrollmentID = 632463
    const response = await internalApi.get(`/api/enrollments/632463`, {});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
