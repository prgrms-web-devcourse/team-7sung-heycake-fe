import { Container, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import {
  MarketAddressIcon,
  MarketInfoIcon,
  MarketOpeningIcon,
  MarketTelIcon,
} from './icon';
import MarketTitle from './markettitle';

export default function MarketProfile() {
  return (
    <>
      <MarketTitle />
      <Container centerContent gap={5} padding={4}>
        <Image src="/images/prgms.png" alt="로고" width={240} height={240} />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketInfoIcon w={7} h={7} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              업체 소개
            </Text>
          </Flex>
          <Text padding={2}>
            프로그래머스 케이크 강남점입니다 소개는 최소 3줄은 해야하니까 3줄에
            맞는거 하려고 했는데 4줄은 필요하겠내 4줄은 필요하겠내 4줄은
            필요하겠내 4줄은 필요하겠내
          </Text>
        </Container>
        <Divider borderColor="hey.main" />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketAddressIcon w={8} h={8} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              주소
            </Text>
          </Flex>
          <Text padding={2}>서울시 강남구 서초동</Text>
        </Container>
        <Divider borderColor="hey.main" />
        <Container padding={0}>
          <Flex align="center" gap={2}>
            <MarketTelIcon w={7} h={7} />
            <Text color="hey.main" fontWeight={800} fontSize="xl">
              전화번호
            </Text>
          </Flex>
          <Text padding={2}>010-2022-2356</Text>
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
