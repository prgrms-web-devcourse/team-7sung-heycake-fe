import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { publicApi } from '@/components/Api';
import ERROR_MESSAGES from '@/constants/errorMessages';
import { getAccessToken } from '@/utils/getAccessToken';

import useHandleAxiosError from './useHandleAxiosError';

interface RequestBody {
  orderId: string;
  offerId: number;
  isPaid: boolean;
}

const useSelectOffer = () => {
  const accessToken = getAccessToken();
  const handleAxiosError = useHandleAxiosError();
  const toast = useToast();
  const router = useRouter();

  const mutation = useMutation(
    (body: RequestBody) =>
      publicApi.post('/histories', body, {
        headers: {
          access_token: accessToken as string,
        },
      }),
    {
      onSuccess: () => {
        router.push(`/main`);
        toast({
          status: 'success',
          description: '만나서 결제를 선택하셨어요',
        });
      },
      onError: (error) => {
        handleAxiosError(error);
      },
    }
  );

  const selectOffer = useCallback(
    (orderId: string, offerId: number, isPaid: boolean) => {
      const requestBody = { orderId, offerId, isPaid };
      if (accessToken) {
        mutation.mutate(requestBody);
      } else {
        toast({
          status: 'error',
          description: ERROR_MESSAGES.CHECK_LOGIN,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
