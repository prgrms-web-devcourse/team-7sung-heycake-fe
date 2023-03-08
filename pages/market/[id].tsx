import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getMarketDetail } from '@/components/Api/Market';
import MarketProfile from '@/components/Market';

export default function Market() {
  return <MarketProfile />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [{ params: { id: 1 } }],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (params) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    ['업체 상세 정보', params.id],
    () => getMarketDetail({ enrollmentId: String(params.id) }),
    {
      staleTime: 20000,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      revalidate: 86400,
    },
  };
};
