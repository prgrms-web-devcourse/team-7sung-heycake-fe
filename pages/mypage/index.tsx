import { Box, Container, Flex, Text, useToast } from '@chakra-ui/react';
import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import HeaderTitle from '@/components/Shared/headerTitle';
import deleteAccessToken from '@/utils/deleteAccessToken';
import { getAccessToken } from '@/utils/getAccessToken';
import { getRoleFromToken } from '@/utils/getDecodeToken';

export default function Detail() {
  const router = useRouter();
  const toast = useToast();
  const [isMarket, setIsMarket] = useState(false);

  function handleLogout() {
    deleteAccessToken();

    const toastId = 'success';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        status: 'success',
        description: '로그아웃이 완료되었습니다.',
        duration: 1000,
        containerStyle: {
          marginBottom: '60px',
        },
      });
    }
    router.replace('/');
  }

  useEffect(() => {
    const token = getAccessToken();
    const role = getRoleFromToken(token as string);
    if (role === 'ROLE_MARKET') {
      setIsMarket(true);
    }
  }, []);

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
        <Flex gap={2}>
          {isMarket && (
            <Text
              display="inline"
              fontSize={24}
              fontWeight="bold"
              color="hey.main"
              marginLeft={16}
            >
              사장님
            </Text>
          )}
          <Text display="inline" fontSize={24} fontWeight="bold">
            반갑습니다
          </Text>
        </Flex>
        <Container padding={0}>
          <Text
            display="inline"
            color="hey.main"
            fontSize={24}
            fontWeight="bold"
            marginLeft={14}
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
          {isMarket || (
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
          )}
        </Flex>
        <Container
          display="flex"
          justifyContent="center"
          marginTop={56}
          padding={0}
          onClick={() => handleLogout()}
        >
          <Text fontSize={18} color="hey.normalGray">
            로그아웃
          </Text>
        </Container>
      </Container>
    </>
  );
}
