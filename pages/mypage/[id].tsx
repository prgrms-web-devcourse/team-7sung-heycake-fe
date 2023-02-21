import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
export default function Detail() {
  const router = useRouter();
  const { id } = router.query || ['LOADING'];

  return (
    <div>
      <Header />
      <MypageContainer>
        <MessageContainer>
          <strong>{id}님</strong>
          <br />
          환영합니다!
        </MessageContainer>
        <MypageButtonContainer>
          <Button
            bg="hey.lightOrange"
            width="20rem"
            height="3rem"
            margin="1.5rem"
            fontSize="1.3rem"
            _hover={{ bg: 'hey.sub' }}
            onClick={() => router.push('/mypage/orderlist')}
          >
            내 주문 리스트
          </Button>
          <Button
            bg="hey.lightOrange"
            width="20rem"
            height="3rem"
            fontSize="1.3rem"
            _hover={{ bg: 'hey.sub' }}
            onClick={() => router.push('/mypage/enrollment')}
          >
            업체 정보 등록
          </Button>
        </MypageButtonContainer>
      </MypageContainer>
    </div>
  );
}

const MypageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 11rem;
  font-size: 1.4rem;
  line-height: 70%;
`;

const MypageButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
`;
