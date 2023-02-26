import { Container, Grid } from '@chakra-ui/react';

import MarketItem from './marketItem';

export default function Admin() {
  return (
    <Container mt={4}>
      <Grid gap={4}>
        <MarketItem />
        <MarketItem />
        <MarketItem />
        <MarketItem />
        <MarketItem />
      </Grid>
    </Container>
  );
}
