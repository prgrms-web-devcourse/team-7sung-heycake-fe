import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';

import useSelectOffer from '@/hooks/useSelectOffer';
import { ThreadDto } from '@/types/orders';

export default function Thread({
  commentCount,
  content,
  expectedPrice,
  imageUrl,
  marketId,
  marketName,
  offerId,
}: ThreadDto) {
  const selectOffer = useSelectOffer();

  return (
    <ThreadWrapper>
      <ThreadTopWrapper>
        <ThreadTitle>{marketName}</ThreadTitle>
        <ExpectedPrice>{expectedPrice}원</ExpectedPrice>
      </ThreadTopWrapper>
      <Image
        src={imageUrl}
        width={150}
        height={150}
        alt="cake"
        loading="lazy"
      />
      <div>{content}</div>
      <Button onClick={() => selectOffer(marketId, offerId)}>
        해당 업체 선택
      </Button>
      <MoreComments>{`${commentCount}개 댓글 더 보기 >`}</MoreComments>
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
