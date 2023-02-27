import { Grid, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import getCakeList from '../Api/getCakeList';
import CakeItem from './cakeItem';

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
    return <span>Loading...</span>;
  }
  return (
    <Grid padding={0} gap={4} flexDirection="column">
      {data?.map((item: any) => (
        <Grid>
          <Text>{item.orderId}</Text>
          <Text>{item.title}</Text>
          <Text>{item.cakeCategory}</Text>
          <Text>{item.cakeSize}</Text>
          <Text>{item.image}</Text>
          <Text>{item.price}</Text>
          <Text>{item.orderStatus}</Text>
          <Text>{item.end_date}</Text>
        </Grid>
      ))}
      <CakeItem />
      <CakeItem />
      <CakeItem isCompleted />
      <CakeItem />
      <CakeItem />
      <CakeItem />
    </Grid>
  );
}
