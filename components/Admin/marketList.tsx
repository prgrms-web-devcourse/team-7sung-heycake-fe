import { Grid, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { getMarketList } from '../Api/Market';
import AdminListSkeleton from './adminLIstSkeleton';
import MarketItem from './marketItem';
import { IMarketItem, IMarketList } from './types';

export default function MarketList({ category }: IMarketList) {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cursor, setCursor] = useState('');
  const { status, data } = useQuery(['승인 마켓 리스트', category], () =>
    getMarketList({ cursor, category })
  );

  if (status === 'loading' || !router.isReady) {
    return <AdminListSkeleton />;
  }

  return (
    <Grid gap={0}>
      {data?.map((item: IMarketItem) => (
        <Stack key={item.enrollmentId}>
          <MarketItem
            category={category}
            enrollmentId={item.enrollmentId}
            imageUrl={item.imageUrl}
            marketName={item.marketName}
            businessNumber={item.businessNumber}
            status={item.status}
          />
        </Stack>
      ))}
    </Grid>
  );
}
