import { useToast } from '@chakra-ui/react';
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
  const toast = useToast();

  const mutation = useMutation(
    (body: RequestBody) =>
      publicApi.post('/histories', body, {
        headers: {
          access_token: accessToken as string,
        },
      }),
    {
      onSuccess: () => {
        toast({
          status: 'success',
          description: '해당 업체를 선택하셨어요',
          isClosable: true,
        });
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
        toast({
          status: 'error',
          description: '로그인을 해주세요',
          isClosable: true,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [accessToken, mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
