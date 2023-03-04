import { Grid } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import getCakeList from '../../Api/Main';
import { ICakeItemData } from '../types';
import CakeItem from './cakeItem';
import CakeListSkeleton from './cakeListSkeleton';

export default function CakeList({ category, location }: any) {
  const { ref, inView } = useInView();
  const router = useRouter();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['전체 케이크 리스트', category, location],
    ({ pageParam = '' }) =>
      getCakeList({
        location,
        category,
        cursor: pageParam,
      }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.cursorId !== 0 ? lastPage.cursorId : undefined,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === 'loading' || !router.isReady) {
    return <CakeListSkeleton />;
  }

  return (
    <>
      <Grid padding={0} gap={4} flexDirection="column">
        {data?.pages.map((page) =>
          page.content.map((item: ICakeItemData) => (
            <Link key={item.orderId} href={`/orders/${item.orderId}`}>
              <CakeItem
                title={item.title}
                category={item.cakeInfo.cakeCategory}
                cakeSize={item.cakeInfo.cakeSize}
                image={item.images[0]}
                price={item.hopePrice}
                status={item.orderStatus}
                visitTime={item.visitTime}
              />
            </Link>
          ))
        )}
      </Grid>
      {isFetchingNextPage ? <CakeListSkeleton /> : <div ref={ref} />}
    </>
  );
}
