import { Flex, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { LoginIcon, LogoutIcon, UserIcon } from './icon';

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const user = window.localStorage.getItem('ACCESS_TOKEN');
    if (user) {
      setIsLogin(true);
    }
  }, []);
  return (
    <Flex>
      <Container>
        <Link href="/main">
          <Image src="/images/logo.png" alt="로고" width={40} height={40} />
        </Link>
        <ButtonContainer>
          {isLogin ? (
            <>
              <Link href="/admin">
                <IconButton
                  variant="ghost"
                  aria-label="유저"
                  icon={<UserIcon w={8} h={8} />}
                />
              </Link>
              <Link href="/logout">
                <IconButton
                  variant="ghost"
                  aria-label="로그아웃"
                  icon={<LogoutIcon w={8} h={8} />}
                />
              </Link>
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
  width: 550px;
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
