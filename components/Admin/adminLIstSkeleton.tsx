import { Grid, Skeleton } from '@chakra-ui/react';

export default function AdminListSkeleton() {
  return (
    <Grid justifyItems="center" padding={0} gap={4} flexDirection="column">
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
      <Skeleton height="140px" />
    </Grid>
  );
}
