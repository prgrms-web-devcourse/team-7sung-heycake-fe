import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';
import Script from 'next/script';

import { getMarketDetail } from '@/components/Api/Market';
import MarketProfile from '@/components/Market';

export default function Market() {
  return (
    <>
      <Script
        type="text/javascript"
        src={`dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_KEY}`}
      />
      <MarketProfile />
    </>
  );
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
