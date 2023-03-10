import { dehydrate, QueryClient } from '@tanstack/react-query';
import { GetStaticPaths, GetStaticProps } from 'next';

import AdminMarketInfo from '@/components/Admin/adminMarketInfo';
import { getMarketDetail } from '@/components/Api/Market';
import AuthRequired from '@/utils/authRequire';

export default function AdminMarket() {
  return (
    <AuthRequired>
      <AdminMarketInfo />;
    </AuthRequired>
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
