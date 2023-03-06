import { dehydrate, QueryClient } from '@tanstack/react-query';

import getCakeList from '@/components/Api/Main';
import CakeMain from '@/components/Main/cake/cakeMain';

export default function Main() {
  return <CakeMain />;
}

export async function getServerSideProps() {
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
}
