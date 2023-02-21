import Header from '@/components/Header';
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <>
      <Head>
        <title>Hey, cake</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ImageContainer>
        <Image src="/images/logo.png" alt="로고" width={300} height={300} />
      </ImageContainer>
      <ButtonContainer>
        <Button bg="#F7B500" width="20rem" margin="1rem">
          카카오톡으로 로그인
        </Button>
        <Button bg="#FFEAB2" width="20rem">
          비회원으로 둘러보기
        </Button>
      </ButtonContainer>
    </>
  );
}

const ImageContainer = styled.main`
  display: flex;
  justify-content: center;
  margin-top: 7rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
