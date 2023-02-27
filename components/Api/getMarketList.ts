/* eslint-disable consistent-return */
import internalApi from '.';

export default async function getMarketList() {
  try {
    const response = await internalApi.get(`/api/enrollments`, {});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
