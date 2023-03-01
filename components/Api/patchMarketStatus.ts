import { internalApi } from '.';

export default async function patchMarketStatus({ status, enrollmentId }: any) {
  try {
    const response = await internalApi.patch(`/api/marketstatus`, {
      status,
      enrollmentId,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
  return console.error('마켓 상태 변경에 문제가 발생했습니다');
}
