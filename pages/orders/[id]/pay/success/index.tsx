import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useSelectOffer from '@/hooks/useSelectOffer';

interface PaySuccessProps {
  id: string;
  threadOfferId: string;
}

export default function PaySuccess({ id, threadOfferId }: PaySuccessProps) {
  const router = useRouter();
  const selectOffer = useSelectOffer();

  useEffect(() => {
    selectOffer(id, Number(threadOfferId), true);
    router.push(`/orders/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    id: query.id,
    threadOfferId: query.threadOfferId,
  },
});
