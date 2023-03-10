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
      onSuccess: (_, variables) => {
        router.push(`/main`);
        const toastId = 'success';
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            status: 'success',
            duration: 1000,
            description: variables.isPaid
              ? '결제 완료! 만나서 수령해주세요'
              : '만나서 결제를 선택하셨어요',
            containerStyle: {
              marginBottom: '60px',
            },
          });
        }
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
        const toastId = 'error';
        if (!toast.isActive(toastId)) {
          toast({
            id: toastId,
            status: 'error',
            duration: 1000,
            description: ERROR_MESSAGES.CHECK_LOGIN,
            containerStyle: {
              marginBottom: '60px',
            },
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
