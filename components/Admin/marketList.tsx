import { CircularProgress, Grid, Stack } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getMarketList } from '@/components/Api/Market';
import ApiErrorAlert from '@/components/Shared/apiErrorAlert';
import { IMarketItem, IMarketList } from '@/types/Admin';

import AdminListSkeleton from './adminLIstSkeleton';
import MarketItem from './marketItem';

export default function MarketList({ category }: IMarketList) {
  const { ref, inView } = useInView();
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['승인 마켓 리스트', category],
    ({ pageParam = '' }) => getMarketList({ cursor: pageParam, category }),
    {
      getNextPageParam: (lastPage) =>
        lastPage.nextCursor !== 0 ? lastPage.nextCursor : undefined,
    }
  );

  useEffect(() => {
    if (inView) fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (status === 'loading') {
    return <AdminListSkeleton />;
  }

  if (status === 'error') {
    return <ApiErrorAlert />;
  }

  return (
    <>
      <Grid gap={0}>
        {data?.pages.map((page) =>
          page?.enrollments.map((item: IMarketItem) => (
            <Stack key={item.enrollmentId}>
              <MarketItem
                phoneNumber={item.phoneNumber}
                category={category}
                enrollmentId={item.enrollmentId}
                imageUrl={item.imageUrl}
                marketName={item.marketName}
                businessNumber={item.businessNumber}
                status={item.status}
              />
            </Stack>
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
