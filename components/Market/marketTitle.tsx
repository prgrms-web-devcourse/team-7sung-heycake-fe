import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { ArrowBackIcon } from './icon';

export default function MarketTitle() {
  return (
    <>
      <Container>
        <ArrowBackIcon w={10} h={10} />
        <Text fontSize="2xl" align="center" fontWeight="700">
          프그케이크 강남점
        </Text>
        <Box w={10} h={10} />
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 60px;
  background-color: white;
  display: flex;
  padding: 10px;
  border-bottom: 2px solid #d9d9d9;
  align-items: center;
  justify-content: space-between;
`;
