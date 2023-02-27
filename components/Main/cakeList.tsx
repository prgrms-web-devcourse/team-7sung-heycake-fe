import { Grid } from '@chakra-ui/react';

export default function CakeList() {
  return (
    <Grid>
      <Text>{item.postId}</Text>
      <Text>{item.category}</Text>
      <Text>{item.size}</Text>
      <Text>{item.flavor}</Text>
      <Text>{item.image}</Text>
      <Text>{item.price}</Text>
    </Grid>
  );
}
