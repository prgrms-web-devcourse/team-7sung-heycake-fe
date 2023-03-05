import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { publicApi } from '@/components/Api';

interface RequestBody {
  marketId: number;
  offerId: number;
}

const useSelectOffer = () => {
  const mutation = useMutation(
    (body: RequestBody) => publicApi.post('/histories', body),
    {
      onSuccess: () => {
        alert('해당 업체를 선택하셨어요');
      },
      onError: () => {
        alert(
          '해당 업체를 선택하는데에 예상치 못한 애러가 발생했어요. 다시 시도해 주세요.'
        );
      },
    }
  );

  const selectOffer = useCallback(
    (marketId: number, offerId: number) => {
      const requestBody = { marketId, offerId };
      mutation.mutate(requestBody);
    },
    [mutation]
  );

  return selectOffer;
};

export default useSelectOffer;
