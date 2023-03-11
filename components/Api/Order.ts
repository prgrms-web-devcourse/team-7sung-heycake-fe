import ERROR_MESSAGES from '@/constants/errorMessages';
import { IgetOrderList } from '@/types/Api';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '.';

const ACCESS_TOKEN = getAccessToken();

export async function getOrderList({
  cursorId = null,
  pageSize = null,
  orderStatus = null,
}: IgetOrderList) {
  if (ACCESS_TOKEN === null) {
    throw Error(ERROR_MESSAGES.CHECK_LOGIN);
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
    throw Error();
  }
  throw Error('주문 리스트 조회에 실패하였습니다');
}

export async function deleteOrder(orderId: string) {
  if (ACCESS_TOKEN === null) {
    throw Error(ERROR_MESSAGES.CHECK_LOGIN);
  }
  try {
    await publicApi.delete(`/orders/${orderId}`, {
      headers: {
        access_token: ACCESS_TOKEN,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw Error();
  }
}
