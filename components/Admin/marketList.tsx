import { Box, Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import getMarketList from '../Api/getMarketList';
import CakeListSkeleton from '../Main/cakeListSkeleton';
import MarketItem from './marketItem';

export default function MarketList({ category }: any) {
  const { status, data } = useQuery(['승인 마켓 리스트', category], () =>
    getMarketList()
  );

  if (status === 'loading') {
    return <CakeListSkeleton />;
  }

  return (
    <Grid gap={4}>
      {data?.map((item: any) => (
        <Box key={item.enrollmentId}>
          <MarketItem
            enrollmentId={item.enrollmentId}
            marketImage={item.marketImage}
            marketName={item.marketName}
            businessNumber={item.businessNumber}
            status={item.status}
          />
        </Box>
      ))}
    </Grid>
  );
}
