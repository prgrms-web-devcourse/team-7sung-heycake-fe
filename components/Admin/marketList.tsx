import { Box, Grid, Stack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import getMarketList from '../Api/getMarketList';
import CakeListSkeleton from '../Main/cakeListSkeleton';
import MarketItem from './marketItem';

export default function MarketList({ category }: any) {
  const [cursor, setCursor] = useState('');
  const { status, data } = useQuery(['승인 마켓 리스트', category], () =>
    getMarketList({ cursor, category })
  );

  if (status === 'loading') {
    return <CakeListSkeleton />;
  }

  return (
    <Grid gap={0}>
      {data?.map((item: any) => (
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
