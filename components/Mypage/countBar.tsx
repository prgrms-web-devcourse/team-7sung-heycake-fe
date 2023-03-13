import { Container, Text } from '@chakra-ui/react';

import { MypageCount } from '@/types/orders';

export default function CountBar({ count }: MypageCount) {
  return (
    <Container backgroundColor="#F6F7FB" height="46px">
      <Text fontSize={16} padding={3}>
        총 {count}건
      </Text>
    </Container>
  );
}
