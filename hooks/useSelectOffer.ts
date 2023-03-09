import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { publicApi } from '@/components/Api';
import { getAccessToken } from '@/utils/getAccessToken';

import useHandleAxiosError from './useHandleAxiosError';

interface RequestBody {
  orderId: string;
  offerId: number;
}

const useSelectOffer = () => {
  const accessToken = getAccessToken();
  const handleAxiosError = useHandleAxiosError();

  const mutation = useMutation(
    (body: RequestBody) =>
      publicApi.post('/histories', body, {
        headers: {
          access_token: accessToken as string,
        },
      }),
    {
      onSuccess: () => {
        alert('해당 업체를 선택하셨어요');
      },
      onError: (error) => {
        handleAxiosError(error);
      },
    }
  );

  const selectOffer = useCallback(
    (orderId: string, offerId: number) => {
      const requestBody = { orderId, offerId };
      if (accessToken) {
        mutation.mutate(requestBody);
      } else {
        alert('로그인을 해주세요');
      }
    },
    [accessToken, mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
