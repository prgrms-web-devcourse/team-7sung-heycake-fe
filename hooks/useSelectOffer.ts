import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

import { publicApi } from '@/components/Api';

interface RequestBody {
  orderId: string;
  offerId: number;
}

interface ErrorResponse {
  message?: string;
}

const useSelectOffer = () => {
  const mutation = useMutation(
    (body: RequestBody) => publicApi.post('/histories', body),
    {
      onSuccess: () => {
        alert('해당 업체를 선택하셨어요');
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (!axiosError.response) return;

        const errorMessage = JSON.parse(
          axiosError.response.data.message ?? '{}'
        ) as { message?: string };

        if (axiosError.response.status === 401) {
          alert(errorMessage.message || '인증되지 않은 요청입니다.');
        } else if (axiosError.response?.status === 403) {
          alert(errorMessage.message || '접근 권한이 없습니다.');
        } else if (axiosError.response?.status === 500) {
          alert(
            errorMessage.message ||
              '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
          );
        } else {
          alert(
            '해당 업체를 선택하는데에 예상치 못한 애러가 발생했어요. 다시 시도해 주세요.'
          );
        }
      },
    }
  );

  const selectOffer = useCallback(
    (orderId: string, offerId: number) => {
      const requestBody = { orderId, offerId };
      mutation.mutate(requestBody);
    },
    [mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
