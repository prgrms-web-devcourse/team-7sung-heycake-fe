import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface PaySuccessProps {
  id: string;
}

export default function PayFail({ id }: PaySuccessProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(`/orders/${id}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    id: query.id,
  },
});
