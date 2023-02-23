import styled from '@emotion/styled';
import Image from 'next/image';

import DataTable from '@/components/Orders/DataTable';

export default function Orders() {
  return (
    <>
      <Image alt="cake" src="/images/cake.png" width={1000} height={1000} />
      <OrderWrapper>
        <div>
          <OrderRequestCount>+ 3</OrderRequestCount>
          <OrderTitle>딸기케이크 만들어주세요</OrderTitle>
          <PlaceOrderRequester>서울특별시 양천구 목동</PlaceOrderRequester>
        </div>
        <DataTable title="케익 모양" value="동그라미" />
        <DataTable title="케익 모양" value="동그라미" />
        <DataTable title="케익 모양" value="동그라미" />
        <OrderContent>
          사라지지 뜨고, 무엇을 힘차게 철환하였는가? 찾아 용감하고 우리 예가
          싹이 자신과 동산에는 생명을 꾸며 교향악이다. 이것을 인생에 가는
          뜨거운지라, 이성은 있는가? 방황하여도, 불러 피가 이는 사랑의 어디
          교향악이다. 심장은 청춘 고행을 없으면 청춘의 바이며, 두손을 때까지
          같으며, 사막이다. 속에서 길을 그림자는 청춘의 바로 얼음이 것이다.
          이상의 방황하여도, 피어나기 것은 같이, 얼마나 부패뿐이다. 이상 피부가
          이 광야에서 품었기 속잎나고, 불러 끓는다. 불러 그들의 쓸쓸한 우리는
          작고 보이는 군영과 별과 봄바람이다. 목숨이 피고, 할지니, 싸인 석가는
          인도하겠다는 산야에 피가 사라지지 보라. 스며들어 구하지 그들은 설레는
          끓는다.아름답고 갑 용기가 내려온 기쁘며, 쓸쓸하랴? 품었기 끝까지
          있음으로써 눈이 아니더면, 용감하고 뿐이다. 피에 같은 불어 대한 것이다
        </OrderContent>
        <OrderRequestCountCard>
          <Image
            alt="birthday-cake"
            src="/images/birthday-cake.png"
            width={40}
            height={40}
          />
          신청한 케이크 업체 3개
        </OrderRequestCountCard>
      </OrderWrapper>
    </>
  );
}

const OrderWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const OrderTitle = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;

const OrderRequestCount = styled.span`
  color: white;
  background-color: #e53e3e;
  padding: 0 1rem;
  padding-bottom: 2px;
  border-radius: 1rem;
`;

const PlaceOrderRequester = styled.p`
  font-size: 0.9rem;
  color: #777777;
`;

const OrderContent = styled.div`
  padding: 2rem 0;
  font-size: 0.8rem;
`;

const OrderRequestCountCard = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #feebcb;
  padding: 1.4rem;
  align-items: center;
  font-weight: bold;
  border-radius: 6px;
`;
