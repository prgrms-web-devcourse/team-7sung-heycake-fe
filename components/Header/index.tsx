import { IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';

import { LoginIcon, LogoutIcon, UserIcon } from './icon';

export default function Header() {
  return (
    <Container>
      <Link href="/main">
        <Image src="/images/logo.png" alt="로고" width={40} height={40} />
      </Link>
      <ButtonContainer>
        <Link href="/">
          <IconButton
            variant="ghost"
            aria-label="로그아웃"
            icon={<LogoutIcon w={8} h={8} />}
          />
        </Link>
        <Link href="/market/prgs">
          <IconButton
            variant="ghost"
            aria-label="유저"
            icon={<UserIcon w={8} h={8} />}
          />
        </Link>
        <Link href="/login">
          <IconButton
            variant="ghost"
            aria-label="로그인"
            icon={<LoginIcon w={8} h={8} />}
          />
        </Link>
      </ButtonContainer>
    </Container>
  );
}

const Container = styled.div`
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
