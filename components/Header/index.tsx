import { IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { LoginIcon, UserIcon, LogoutIcon } from './icon';

export default function Header() {
  return (
    <>
      <Container>
        <Image src="/images/logo.png" alt="로고" width={40} height={40} />
        <ButtonContainer>
          <LogoutIcon aria-label="로그아웃" w={10} h={10} />
          <UserIcon aria-label="유저" w={10} h={10} />
          <LoginIcon aria-label="로그인" w={10} h={10} />
        </ButtonContainer>
      </Container>
    </>
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
