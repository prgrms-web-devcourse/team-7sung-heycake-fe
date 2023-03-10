import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ArrowBackIcon } from '@/public/icon';
import { IMarketTitle } from '@/types/Market';

export default function HeaderTitle({ title }: IMarketTitle) {
  const router = useRouter();
  return (
    <Flex h={14} p={4} justifyContent="space-between" alignItems="center">
      <ArrowBackIcon w={6} h={6} onClick={() => router.back()} />
      <Text fontSize="18px" align="center" fontWeight="500">
        {title}
      </Text>
      <Box w={10} h={10} />
    </Flex>
  );
}
