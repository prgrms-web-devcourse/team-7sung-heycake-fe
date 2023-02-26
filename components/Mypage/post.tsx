import { Box, Container, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

export default function Post() {
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
      <Box w="70px" h="70px">
        <Image
          src="/images/prgms.png"
          width={70}
          height={70}
          alt="케이크 이미지"
        />
      </Box>
      <Container margin="0 0 0 5px" border="0" padding="0">
        <OrderRequestCount>+ 3</OrderRequestCount>
        <Container padding="0">
          <Text fontSize="1rem" fontWeight="bold">
            딸기 케이크 만들어주세요!
          </Text>
          <Text color="gray">서울 특별시 양천구 목동</Text>
        </Container>
      </Container>
    </Container>
  );
}

const OrderRequestCount = styled.span`
  color: white;
  background-color: #e53e3e;
  padding: 0 1rem;
  padding-bottom: 1px;
  border-radius: 1rem;
  margin-bottom: 2px;
`;
