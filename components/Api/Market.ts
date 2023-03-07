import API_ERROR_MESSAGES from '@/constants/Api';

import { internalApi } from '.';
import { IgetMarketDetail, IPatchMarketStatus, IpostMarketList } from './types';

export async function getMarketDetail({ enrollmentId }: IgetMarketDetail) {
  try {
    const response = await internalApi.get(
      `/api/enrollments/${enrollmentId}`,
      {}
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
  throw new Error(API_ERROR_MESSAGES.FAIL_GET_MARKET_DETAIL);
}

export async function postMarketList({ cursor, category }: IpostMarketList) {
  try {
    const response = await internalApi.post(`/api/enrollments`, {
      cursor,
      category,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
  throw new Error(API_ERROR_MESSAGES.FAIL_POST_MARKET_LIST);
}

export async function patchMarketStatus({
  status,
  enrollmentId,
}: IPatchMarketStatus) {
  try {
    const response = await internalApi.patch(`/api/marketstatus`, {
      status,
      enrollmentId,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw new Error((error as Error).message);
  }
  throw new Error(API_ERROR_MESSAGES.FAIL_PATCH_MARKET_STATUS);
}
