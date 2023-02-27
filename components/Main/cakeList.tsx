import { Grid, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import getCakeList from '../Api/getCakeList';
import CakeItem from './cakeItem';

export default function CakeList({ category, location }: any) {
  const { status, data } = useQuery(['gangnam-photo'], () =>
    getCakeList({
      location,
      category,
    })
  );

  if (status === 'loading') {
    return <span>Loading...</span>;
  }
  return (
    <Grid>
      <Text>{item.postId}</Text>
      <Text>{item.category}</Text>
      <Text>{item.size}</Text>
      <Text>{item.flavor}</Text>
      <Text>{item.image}</Text>
      <Text>{item.price}</Text>

      <CakeItem />
      <CakeItem />
      <CakeItem isCompleted />
      <CakeItem />
      <CakeItem />
      <CakeItem />
    </Grid>
  );
}
