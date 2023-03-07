import { Box, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { IMypagePost } from './types';

export default function Post({
  id,
  imageUrl,
  orderStatus,
  region,
  title,
  visitTime,
}: IMypagePost) {
  return (
    <Container
      bgColor="hey.lightOrange"
      display="flex"
      marginBottom="1rem"
      padding="1rem"
      width="100"
      borderRadius="10"
      boxShadow="5px 2px 2px grey"
    >
      <Box w="70px" h="70px" id={id}>
        <Image src={imageUrl} width={70} height={70} alt="케이크 이미지" />
      </Box>
      <Container margin="0 0 0 5px" border="0" padding="0">
        <Container
          color="white"
          borderRadius="1rem"
          backgroundColor="hey.main"
          padding="0 1rem"
          width="fit-content"
          display="flex"
        >
          {orderStatus}
        </Container>
        <Container padding="0">
          <Text fontSize="1rem" fontWeight="bold">
            {title}
          </Text>
          <Text color="gray">{region}</Text>
          <Text color="gray">{visitTime}</Text>
        </Container>
      </Container>
    </Container>
  );
}
