import { Box, CircularProgress, Grid, useToast } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import getCakeList from '@/components/Api/Main';
import ApiErrorAlert from '@/components/Shared/apiErrorAlert';
import { ICakeItemData } from '@/types/Main';

import CakeItem from './cakeItem';
import CakeListSkeleton from './cakeListSkeleton';

export default function CakeList({ category, location }: any) {
  const toast = useToast();
  const { ref, inView } = useInView();
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
        !lastPage.isLast ? lastPage.cursorId : undefined,
      staleTime: 3000,
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
    return <ApiErrorAlert />;
  }

  return (
    <>
      <Grid p={0} flexDirection="column">
        {data?.pages.map((page) =>
          page?.content.map((item: ICakeItemData) => (
            <Link key={item.orderId} href={`/orders/${item.orderId}`}>
              <CakeItem
                title={item.title}
                category={item.cakeInfo.cakeCategory}
                cakeSize={item.cakeInfo.cakeSize}
                creamFlavor={item.cakeInfo.creamFlavor}
                breadFlavor={item.cakeInfo.breadFlavor}
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
        <Grid justifyContent="center" mt={12} h="80px">
          <CircularProgress size="80px" isIndeterminate color="hey.main" />
        </Grid>
      ) : (
        <div ref={ref} />
      )}
    </>
  );
}
