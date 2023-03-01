import { internalApi } from '.';

export default async function getMarketList({ cursor, category }: any) {
  try {
    const response = await internalApi.post(`/api/enrollments`, {
      cursor,
      category,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
  return console.error('마켓 승인 리스트를 받아오는데 에러가 발생했습니다');
}
