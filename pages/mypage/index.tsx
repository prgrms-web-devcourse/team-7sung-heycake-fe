import { Box, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import HeaderTitle from '@/components/Shared/headerTitle';
import deleteAccessToken from '@/utils/deleteAccessToken';

export default function Detail() {
  const router = useRouter();
  const toast = useToast();

  function handleLogout() {
    deleteAccessToken();

    toast({
      status: 'success',
      description: '로그아웃이 완료되었습니다.',
      isClosable: true,
    });
    router.replace('/');
  }

  return (
    <>
      <HeaderTitle title="마이 페이지" />
      <Container
        display="flex"
        flexDirection="column"
        py={32}
        px={32}
        margin={0}
        css={css`
          @media (max-width: 390px) {
            padding-left: 2.5rem;
            padding-right: 2.5rem;
          }
        `}
      >
        <Text display="inline" fontSize={24} fontWeight="bold">
          반갑습니다
        </Text>
        <Container padding={0}>
          <Text
            display="inline"
            color="hey.main"
            fontSize={24}
            fontWeight="bold"
          >
            헤이, 케이크&nbsp;
          </Text>
          <Text display="inline" fontSize={24} fontWeight="bold">
            입니다!
          </Text>
        </Container>
        <Flex justifyContent="center" gap="1rem" marginTop={20} width="100%">
          <Link href="/mypage/orderlist">
            <Box
              display="flex"
              flexDir="column"
              alignContent="center"
              border="1px solid"
              borderColor="hey.lightGray"
              minW="150px"
              minH="150px"
              padding={6}
              borderRadius={10}
              _hover={{ borderColor: 'hey.main' }}
            >
              <Flex flexDirection="column" alignItems="center" gap="1rem">
                <Image
                  src="/images/cakeIcon.png"
                  width="50"
                  height="50"
                  quality={100}
                  alt="주문 리스트 아이콘"
                />
                <Text fontSize={16} marginTop={1}>
                  내 주문 리스트
                </Text>
              </Flex>
            </Box>
          </Link>
          <Link href="/mypage/enrollment">
            <Box
              display="flex"
              flexDir="column"
              border="1px solid"
              borderColor="hey.lightGray"
              minW="150px"
              minH="150px"
              padding={6}
              borderRadius={10}
              _hover={{ borderColor: 'hey.main' }}
            >
              <Flex flexDirection="column" alignItems="center" gap="1rem">
                <Image
                  src="/images/shop.png"
                  width="50"
                  height="50"
                  quality={100}
                  alt="업체 등록 아이콘"
                />
                <Text fontSize={16} marginTop={1}>
                  업체 정보 등록
                </Text>
              </Flex>
            </Box>
          </Link>
        </Flex>
        <Container
          display="flex"
          justifyContent="center"
          marginTop={56}
          padding={0}
          onClick={() => handleLogout()}
        >
          <Text fontSize={18} color="hey.normalGray" marginRight={5}>
            로그아웃
          </Text>
        </Container>
      </Container>
    </>
  );
}
