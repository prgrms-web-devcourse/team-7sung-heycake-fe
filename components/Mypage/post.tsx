import { Box, Card, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { IMypagePost } from './types';

export default function Post({
  id,
  imageUrl,
  orderStatus,
  title,
  visitTime,
}: IMypagePost) {
  return (
    <Container
      width="100"
      height="8rem"
      bgColor="hey.lightOrange"
      padding="1rem"
      marginBottom="1rem"
      borderRadius="10"
      boxShadow="4px 2px 2px lightGrey"
      display="flex"
      key={id}
    >
      <Card width={74} height={74} shadow="none" marginTop={3}>
        <Image src={imageUrl} alt="케이크 이미지" fill />
      </Card>
      <Container>
        <Box
          color="white"
          borderRadius="1rem"
          backgroundColor="hey.main"
          padding="0 1rem"
          width="fit-content"
          position="absolute"
          left="18rem"
        >
          {orderStatus}
        </Box>
        <Container padding="0" marginTop={6}>
          <Text fontSize="1rem" fontWeight="bold" marginBottom={1}>
            {title}
          </Text>
          <Text color="gray">{visitTime.slice(0, -3)}</Text>
        </Container>
      </Container>
    </Container>
  );
}
