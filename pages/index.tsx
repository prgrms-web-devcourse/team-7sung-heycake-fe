import { dehydrate, QueryClient } from '@tanstack/react-query';

import getCakeList from '@/components/Api/Main';
import CakeMain from '@/components/Main';

export default function Main() {
  return <CakeMain />;
}

export const getStaticProps = async () => {
  const queryClient = new QueryClient();
  const location = '강남구';

  await queryClient.prefetchInfiniteQuery(
    ['전체 케이크 리스트', '', location],
    () =>
      getCakeList({
        location,
        category: '',
        cursor: '',
      }),
    {
      staleTime: 10000,
    }
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
};
