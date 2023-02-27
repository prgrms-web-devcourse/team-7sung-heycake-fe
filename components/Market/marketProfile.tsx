import { Container, Divider, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import getMarketDetail from '../Api/getMarketDetail';
import {
  MarketAddressIcon,
  MarketInfoIcon,
  MarketOpeningIcon,
  MarketTelIcon,
} from './icon';
import MarketTitle from './marketTitle';

export default function MarketProfile() {
  const router = useRouter();
  const { status, data } = useQuery([router.query.id], () => getMarketDetail());

  if (status === 'loading' || !router.isReady) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <MarketTitle />
      <Container centerContent gap={5} padding={4}>
        <Image
          src="https://i.imgur.com/agjDBqa.png"
          alt="로고"
          width={240}
          height={240}
        />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketInfoIcon w={7} h={7} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              업체 소개
            </Text>
          </Flex>
          <Text padding={2}>{data.description}</Text>
        </Container>
        <Divider borderColor="hey.main" />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketAddressIcon w={8} h={8} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              주소
            </Text>
          </Flex>
          <Text padding={2}>asd</Text>
        </Container>
        <Divider borderColor="hey.main" />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketTelIcon w={7} h={7} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              전화번호
            </Text>
          </Flex>
          <Text padding={2}>{data.phoneNumber}</Text>
        </Container>
        <Divider borderColor="hey.main" />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketOpeningIcon w={7} h={7} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              영업시간
            </Text>
          </Flex>
          <Text padding={2}>연중무휴 일요일은 쉽니다</Text>
        </Container>
        <Divider borderColor="hey.main" />
      </Container>
    </>
  );
}
