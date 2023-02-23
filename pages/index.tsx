import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import kakaoLoginImage from '../public/images/kakao_login_medium_wide.png';

function loginWithKakao() {
  window.Kakao.Auth.authorize({
    redirectUri: 'http://localhost:3000/',
  });
}

export default function Home() {
  return (
    <>
      <ImageContainer>
        <Image
          src="/images/logo.png"
          alt="헤이케이크 로고 이미지"
          width={300}
          height={300}
        />
        <ServiceDescription>커스텀 케이크 제작 의뢰 플랫폼</ServiceDescription>
      </ImageContainer>
      <LoginButtonContainer>
        <Image
          src={kakaoLoginImage}
          alt="카카오 로그인 이미지"
          onClick={loginWithKakao}
        />
        <Button
          bg="hey.lightOrange"
          width="300px"
          height="46.5px"
          marginTop="1rem"
          fontSize="15px"
        >
          비회원으로 둘러보기
        </Button>
      </LoginButtonContainer>
    </>
  );
}

const ImageContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 7rem;
`;

const ServiceDescription = styled.div`
  color: #cbd5e0;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
`;
