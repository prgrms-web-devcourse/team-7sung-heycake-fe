import API_ERROR_MESSAGES from '@/constants/Api';

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
    throw new Error((error as Error).message);
  }
  throw new Error(API_ERROR_MESSAGES.FAIL_GET_CAKE_LIST);
}
