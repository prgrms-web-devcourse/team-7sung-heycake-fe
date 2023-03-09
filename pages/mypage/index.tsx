import { Box, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

export default function Detail() {
  return (
    <Container
      display="flex"
      flexDirection="column"
      flexDir="column"
      padding="150px 0 0 30px"
    >
      <Text display="inline" fontSize={30} fontWeight="bold">
        반갑습니다
        <br />
        <Text display="inline" color="hey.main">
          헤이, 케이크
        </Text>
        입니다!
      </Text>
      <Container display="flex" marginTop={20} padding={0}>
        <Link href="/mypage/orderlist">
          <Box
            display="flex"
            flexDir="column"
            alignContent="center"
            border="1px solid"
            borderColor="hey.lightGray"
            width="154px"
            height="140px"
            padding={5}
            borderRadius={10}
            _hover={{ borderColor: 'hey.main' }}
          >
            <Container>
              <Image
                src="/images/cakeIcon.png"
                width={66}
                height={66}
                quality={100}
                alt="주문 리스트 아이콘"
              />
            </Container>

            <Text fontSize={16}>내 주문 리스트</Text>
          </Box>
        </Link>
        <Link href="/mypage/enrollment">
          <Box
            display="flex"
            flexDir="column"
            border="1px solid"
            borderColor="hey.lightGray"
            width="154px"
            height="140px"
            padding={5}
            borderRadius={10}
            marginLeft={5}
            _hover={{ borderColor: 'hey.main' }}
          >
            <Container>
              <Image
                src="/images/shop.png"
                width={66}
                height={66}
                quality={100}
                alt="업체 등록 아이콘"
              />
            </Container>

            <Text fontSize={16}>업체 정보 등록</Text>
          </Box>
        </Link>
      </Container>
      <Container>
        <Text fontSize={20} color="hey.lightGray">
          로그아웃
        </Text>
      </Container>
    </Container>
  );
}
