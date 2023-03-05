import { internalApi } from '.';
import { IgetCakeList } from './types';

export default async function getCakeList({
  location,
  category,
  cursor,
}: IgetCakeList) {
  try {
    const response = await internalApi.post(`/api/orders`, {
      location,
      category,
      cursor,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    return console.error(error);
  }
  return console.error('케이크 리스트를 받아오는데 에러가 발생했습니다');
}
