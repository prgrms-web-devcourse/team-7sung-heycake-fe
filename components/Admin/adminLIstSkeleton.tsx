import { Skeleton } from '@chakra-ui/react';

export default function AdminListSkeleton() {
  return (
    <>
      <Skeleton height={60} mb={4} />
      <Skeleton height={60} mb={4} />
      <Skeleton height={60} mb={4} />
      <Skeleton height={60} mb={4} />
      <Skeleton height={60} mb={4} />
    </>
  );
}
