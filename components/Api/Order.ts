import { IgetOrderList } from '@/types/Api';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '.';

const ACCESS_TOKEN = getAccessToken();

export async function getOrderList({
  cursorId = null,
  pageSize = null,
  orderStatus = null,
}: IgetOrderList) {
    if (ACCESS_TOKEN=== null) {
      alert('로그인을 해주세요');
      return;
    }
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

export async function deleteOrder(orderId: string) {
    if (ACCESS_TOKEN=== null) {
      alert('로그인을 해주세요');
      return;
    }
  try {
    await publicApi.delete(`/orders/${orderId}`, {
      headers: {
        access_token: ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
  return console.error('주문을 삭제하는 데 실패하였습니다');
}
