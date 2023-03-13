import { Box, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ArrowBackIcon } from '@/public/icon';
import { HeaderTitleProps } from '@/types/Shared';

export default function HeaderTitle({ title }: HeaderTitleProps) {
  const router = useRouter();
  return (
    <Flex
      h={14}
      w="100%"
      p={4}
      justifyContent="space-between"
      alignItems="center"
      position="sticky"
      bg="white"
      top={0}
      zIndex={4000}
    >
      <ArrowBackIcon
        w={6}
        h={6}
        onClick={() => router.back()}
        cursor="pointer"
      />
      <Text fontSize="18px" align="center" fontWeight="500">
        {title}
      </Text>
      <Box w={10} h={10} />
    </Flex>
  );
}
