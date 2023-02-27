import internalApi from '.';

export default async function getMarketList() {
  try {
    const response = await internalApi.get(`/api/enrollments`, {});
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
  return console.error('마켓 승인 리스트를 받아오는데 에러가 발생했습니다');
}
