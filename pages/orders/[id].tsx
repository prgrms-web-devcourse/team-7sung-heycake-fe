import styled from '@emotion/styled';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Image from 'next/image';

import { publicApi } from '@/components/Api';
import { DataTable, ImageSlider, Thread } from '@/components/Orders';
import { Order, ThreadDto } from '@/types/orders';

interface OrderProps {
  order: Order;
  threads: ThreadDto[];
}

export default function Orders({ order, threads }: OrderProps) {
  return (
    <OrderWrapper>
      <ImageSlider images={order.images} />
      <div>
        <OrderRequestCount>+ {order.offerCount}</OrderRequestCount>
        <OrderTitle>{order.title}</OrderTitle>
        <PlaceOrderRequester>{order.region}</PlaceOrderRequester>
      </div>
      <DataTable title="케익 맛" value={order.cakeInfo.breadFlavor} />
      <DataTable title="케익 카테고리" value={order.cakeInfo.cakeCategory} />
      <DataTable title="케익 높이" value={order.cakeInfo.cakeHeight} />
      <DataTable title="케익 사이즈" value={order.cakeInfo.cakeSize} />
      <DataTable title="케익 크림 맛" value={order.cakeInfo.creamFlavor} />
      <OrderContent>{order.cakeInfo.requirements}</OrderContent>
      <OrderRequestCountCard>
        <Image
          alt="birthday-cake"
          src="/images/birthday-cake.png"
          width={40}
          height={40}
        />
        신청한 케이크 업체 {order.offerCount}개
      </OrderRequestCountCard>
      {threads.map((thread) => (
        <Thread thread={thread} />
      ))}
    </OrderWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id: orderId } = context.query;

  const orderResponse = await publicApi.get<Order>(`/orders/${orderId}`);
  const threadResponse = await publicApi.get<ThreadDto[]>(
    `/orders/${orderId}/offers?memberId=1`
  );

  return {
    props: {
      order: orderResponse.data,
      threads: threadResponse.data,
    },
  };
};

const OrderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
