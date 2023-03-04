import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';

import { ThreadDto } from '@/types/orders';

import { publicApi } from '../Api';

interface ThreadProps {
  thread: ThreadDto;
}

interface RequestBody {
  marketId: number;
  offerId: number;
}

export default function Thread({ thread }: ThreadProps) {
  const { marketId, offerId } = thread;

  const mutation = useMutation(
    (body: RequestBody) => publicApi.post('/histories', body),
    {
      onSuccess: () => {
        alert('해당 업체를 선택하셨어요');
      },
      onError: () => {
        alert(
          '해당 업체를 선택하는데에 예상치 못한 애러가 발생했어요. 다시 시도해 주세요.'
        );
      },
    }
  );

  const selectOffer = () => {
    const requestBody = { marketId, offerId };
    mutation.mutate(requestBody);
  };

  return (
    <ThreadWrapper>
      <ThreadTopWrapper>
        <ThreadTitle>{thread.marketName}</ThreadTitle>
        <ExpectedPrice>{thread.expectedPrice}원</ExpectedPrice>
      </ThreadTopWrapper>
      <Image
        src={thread.imageUrl}
        width={150}
        height={150}
        alt="cake"
        loading="lazy"
      />
      <div>{thread.content}</div>
      <Button onClick={selectOffer}>해당 업체 선택</Button>
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
  font-size: 1rem;
`;

const MoreComments = styled.div`
  color: #444444;
  text-decoration: underline;
`;

const ExpectedPrice = styled.div`
  font-size: 1.1rem;
`;
