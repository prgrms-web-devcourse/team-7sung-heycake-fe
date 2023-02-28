import styled from '@emotion/styled';
import Image from 'next/image';

export default function Thread() {
  return (
    <ThreadWrapper>
      <ThreadTopWrapper>
        <ThreadTitle>강남케이크 2호점</ThreadTitle>
        <div>비용: 100,000원</div>
      </ThreadTopWrapper>
      <Image
        src="/images/cake.png"
        width={150}
        height={150}
        alt="cake"
        loading="lazy"
      />
      <div>저희가 예쁘게 만들어드릴게요~! 원하시면 쓰레드 답글 부탁드려요!</div>
      <MoreComments>{`댓글 더 보기 >`}</MoreComments>
    </ThreadWrapper>
  );
}

const ThreadWrapper = styled.div`
  width: 100%;
  min-height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 1.4rem;
  background-color: rgb(239, 239, 240);
  font-size: 0.8rem;
  border-radius: 1rem;
  gap: 2rem;
`;

const ThreadTopWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-weight: bold;
`;

const ThreadTitle = styled.h1`
  font-size: 1.4rem;
`;

const MoreComments = styled.div`
  color: #444444;
  text-decoration: underline;
`;
