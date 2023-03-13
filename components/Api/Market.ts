import API_ERROR_MESSAGES from '@/constants/Api';
import {
  GetMarketDetail,
  PatchMarketStatus,
  PostMarketList,
} from '@/types/Api';
import { getAccessToken } from '@/utils/getAccessToken';

import { internalApi } from '.';

export async function getMarketDetail({ enrollmentId }: GetMarketDetail) {
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

export async function postMarketList({ cursor, category }: PostMarketList) {
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
}: PatchMarketStatus) {
  try {
    const token =
      typeof window !== 'undefined' ? (getAccessToken() as string) : '';
    const response = await internalApi.patch(`/api/marketstatus`, {
      token,
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
