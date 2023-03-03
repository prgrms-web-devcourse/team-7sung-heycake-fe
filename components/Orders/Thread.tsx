import styled from '@emotion/styled';
import Image from 'next/image';

import { ThreadDto } from '@/types/orders';

interface ThreadProps {
  thread: ThreadDto;
}

export default function Thread({ thread }: ThreadProps) {
  return (
    <ThreadWrapper>
      <ThreadTopWrapper>
        <ThreadTitle>{thread.marketName}</ThreadTitle>
        <div>비용: {thread.expectedPrice}원</div>
      </ThreadTopWrapper>
      <Image
        src={thread.imageUrl}
        width={150}
        height={150}
        alt="cake"
        loading="lazy"
      />
      <div>{thread.content}</div>
      <MoreComments>{`${thread.commentCount}개 댓글 더 보기 >`}</MoreComments>
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
