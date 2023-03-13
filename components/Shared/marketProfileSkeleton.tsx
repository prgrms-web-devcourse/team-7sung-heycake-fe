import { Grid, Skeleton } from '@chakra-ui/react';

export default function MarketProfileSkeleton() {
  return (
    <Grid justifyItems="center" gap={4}>
      <Skeleton width="360px" height="60px" />
      <Skeleton width="240px" height="240px" />
      <Skeleton width="360px" height="600px" />
    </Grid>
  );
}
