/* eslint-disable consistent-return */
import internalApi from '.';

export default async function getCakeList({
  location,
  category,
  cursor = 0,
}: any) {
  try {
    const response = await internalApi.post(`/api/orders/${cursor}`, {
      location,
      category,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
}
