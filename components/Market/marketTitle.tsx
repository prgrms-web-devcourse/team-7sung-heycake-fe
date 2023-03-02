import { Box, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

import { ArrowBackIcon } from './icon';
import { IMarketTitle } from './types';

export default function MarketTitle({ title }: IMarketTitle) {
  const router = useRouter();
  return (
    <Container>
      <ArrowBackIcon w={10} h={10} onClick={() => router.back()} />
      <Text fontSize="2xl" align="center" fontWeight="700">
        {title}
      </Text>
      <Box w={10} h={10} />
    </Container>
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
