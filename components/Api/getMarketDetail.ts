import internalApi from '.';

export default async function getMarketDetail({ enrollmentId }: any) {
  try {
    const response = await internalApi.get(
      `/api/enrollments/${enrollmentId}`,
      {}
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
  return console.error('마켓 상세 정보를 받아오는데 에러가 발생했습니다');
}
