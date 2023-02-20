import { IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { LoginIcon } from './icon';

export default function Header() {
  return (
    <>
      <Container>
        <Image src="/images/logo.png" alt="로고" width={40} height={40} />
        <IconButton
          color="orange.600"
          aria-label="로그인"
          icon={<LoginIcon />}
        />
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

const Button = styled.button``;
