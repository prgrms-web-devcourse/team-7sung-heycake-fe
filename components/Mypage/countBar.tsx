import { Container, Text } from '@chakra-ui/react';

import { IMypageCount } from './types';

export default function CountBar({ count }: IMypageCount) {
  return (
    <Container backgroundColor="#F6F7FB" height="46px">
      <Text fontSize={16} padding={2}>
        총 {count}건
      </Text>
    </Container>
  );
}
