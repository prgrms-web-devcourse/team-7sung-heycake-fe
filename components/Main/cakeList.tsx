import { Grid } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';

import getCakeList from '../Api/Main';
import CakeItem from './cakeItem';
import CakeListSkeleton from './cakeListSkeleton';
import { ICakeItemData } from './types';

export default function CakeList({ category, location }: any) {
  const { status, data } = useQuery(
    ['전체 케이크 리스트', category, location],
    () =>
      getCakeList({
        location,
        category,
      })
  );

  if (status === 'loading') {
    return <CakeListSkeleton />;
  }

  return (
    <Grid padding={0} gap={4} flexDirection="column">
      {data?.map((item: ICakeItemData) => (
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
      ))}
    </Grid>
  );
}
