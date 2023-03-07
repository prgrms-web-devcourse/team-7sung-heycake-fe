import { IgetOrderList } from '@/types/Api';

import { publicApi } from '.';

// localStorage access_token 사용 예정
const ACCESS_TOKEN =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaGV5LWNha2UiLCJleHAiOjM2NzgwOTQyNTMsImlhdCI6MTY3ODA5NDI1MywibWVtYmVySWQiOjJ9.efMIPCAP9jf6-HklFpQ832Ur50LSLq-H6_7Tcwemh7wPc7NrVJIherhvdoxIXA7NWl9xm1mQsKgzbnRD6MuB1g';

export default async function getOrderList({
  cursorId = null,
  pageSize = null,
  orderStatus = null,
}: IgetOrderList) {
  try {
    const response = await publicApi.get(`/orders/my`, {
      headers: {
        access_token: ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
      params: {
        cursorId,
        pageSize,
        orderStatus,
      },
    });
    if (response.status === 200) {
      return response.data.myOrderResponseList;
    }
  } catch (error) {
    console.error(error);
  }
  return console.error('주문 리스트 조회에 실패하였습니다');
}
