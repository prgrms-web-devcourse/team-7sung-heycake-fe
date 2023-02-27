/* eslint-disable consistent-return */
import internalApi from '.';

export default async function getMarketDetail({ enrollmentId }) {
  try {
    // enrollmentID = 632463
    const response = await internalApi.get(
      `/api/enrollments/${enrollmentId}`,
      {}
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
