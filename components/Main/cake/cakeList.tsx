import { Box, CircularProgress, Grid, useToast } from '@chakra-ui/react';
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
  const toast = useToast();
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
        !lastPage?.isLast ? lastPage?.cursorId : undefined,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
    if (status === 'success' && data?.pages[0]?.content.length === 0) {
      const id = `cake empty`;
      if (!toast.isActive(id)) {
        toast({
          id,
          status: 'info',
          position: 'bottom',
          duration: 2000,
          render: () => (
            <Box
              m={3}
              mb={80}
              color="white"
              p={3}
              bg="hey.darkGray"
              borderRadius={6}
              textAlign="center"
              fontWeight="500"
            >
              해당 지역에 케이크가 없습니다
            </Box>
          ),
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.pages, inView, status, toast]);

  if (status === 'loading') {
    return <CakeListSkeleton />;
  }

  if (status === 'error') {
    alert('메인페이지 조회에 실패했습니다. (새로고침)');
    return router.back();
  }

  return (
    <>
      <Grid padding={0} gap={4} flexDirection="column">
        {data?.pages.map((page) =>
          page?.content.map((item: ICakeItemData) => (
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
      {isFetchingNextPage ? (
        <Grid justifyContent="center" mt={12}>
          <CircularProgress size="80px" isIndeterminate color="hey.main" />
        </Grid>
      ) : (
        <div ref={ref} />
      )}
    </>
  );
}
