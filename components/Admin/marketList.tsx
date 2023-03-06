import { CircularProgress, Grid, Stack } from '@chakra-ui/react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { getMarketList } from '../Api/Market';
import AdminListSkeleton from './adminLIstSkeleton';
import MarketItem from './marketItem';
import { IMarketItem, IMarketList } from './types';

export default function MarketList({ category }: IMarketList) {
  const { ref, inView } = useInView();
  const router = useRouter();
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

  if (status === 'loading' || !router.isReady) {
    return <AdminListSkeleton />;
  }

  if (status === 'error') {
    alert(
      '마켓신청 리스트 조회에 실패했습니다. (새로고침 or 메인페이지 이동버튼)'
    );
    return router.back();
  }

  return (
    <>
      <Grid gap={0}>
        {data?.pages.map((page) =>
          page.enrollments.map((item: IMarketItem) => (
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
