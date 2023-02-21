import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

export default function Home() {
  return (
    <>
      <ImageContainer>
        <img src="/images/logo.png" alt="로고" width={300} height={300} />
        <ServiceDescription>커스텀 케이크 제작 의뢰 플랫폼</ServiceDescription>
      </ImageContainer>
      <LoginButtonContainer>
        <img src="/images/kakao_login_medium_wide.png" alt="로고" width={310} />
        <Button
          bg="hey.lightOrange"
          width="310px"
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
