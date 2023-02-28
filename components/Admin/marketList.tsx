import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

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

  /* <Link key={item.enrollmentId} href={`/market/${item.enrollmentId}`}></Link> */

  return (
    <Grid gap={4}>
      {data?.map((item: any) => (
        <MarketItem
          marketImage={item.marketImage}
          marketName={item.marketName}
          businessNumber={item.businessNumber}
          status={item.status}
        />
      ))}
    </Grid>
  );
}
