import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getMarketDetail } from '@/components/Api/Market';
import MarketProfile from '@/components/Market';

export default function Market() {
  return <MarketProfile />;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (content) => {
  const queryClient = new QueryClient();
  const id = content.params?.id as string;

  await queryClient.prefetchQuery(
    ['업체 상세 정보', id],
    () => getMarketDetail({ enrollmentId: id }),
    {
      staleTime: 1000 * 60 * 60,
    }
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 86400,
    },
  };
};
