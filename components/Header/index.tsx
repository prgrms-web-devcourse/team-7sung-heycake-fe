import { Flex, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { LoginIcon, LogoutIcon, UserIcon } from '@/public/icon';
import { deleteAccessToken } from '@/utils/deleteAccessToken';
import { getAccessToken } from '@/utils/getAccessToken';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  const { code } = router.query;

  useEffect(() => {
    const user = getAccessToken();
    if (user) {
      setIsLogin(true);
    }
  }, [code]);

  const onLogoutHandler = () => {
    deleteAccessToken();
    router.replace('/login');
  };
  return (
    <Flex>
      <Container>
        <Link href="/main">
          <Image src="/images/logo.png" alt="로고" width={40} height={40} />
        </Link>
        <ButtonContainer>
          {isLogin ? (
            <>
              <Link href="/mypage">
                <IconButton
                  variant="ghost"
                  aria-label="유저"
                  icon={<UserIcon w={8} h={8} />}
                />
              </Link>
              <IconButton
                variant="ghost"
                aria-label="로그아웃"
                onClick={onLogoutHandler}
                icon={<LogoutIcon w={8} h={8} />}
              />
            </>
          ) : (
            <Link href="/">
              <IconButton
                variant="ghost"
                aria-label="로그인"
                icon={<LoginIcon w={8} h={8} />}
              />
            </Link>
          )}
        </ButtonContainer>
      </Container>
    </Flex>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
