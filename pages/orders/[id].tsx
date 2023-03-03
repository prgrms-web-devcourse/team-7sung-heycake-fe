import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { publicApi } from '@/components/Api';
import { DataTable, ImageSlider, Thread } from '@/components/Orders';
import { Order, ThreadDto } from '@/types/orders';
import {
  convertBreadFlavor,
  convertCakeCategory,
  convertCakeHeight,
  convertCakeSize,
  convertCreamFlavor,
  getOrderStatusText,
} from '@/utils/orders';

export default function Orders() {
  const router = useRouter();
  const { id: orderId } = router.query;

  const { data: order } = useQuery<Order>(['orders', orderId], () =>
    publicApi.get(`/orders/${orderId}`).then((response) => response.data)
  );

  const { data: threads } = useQuery<ThreadDto[]>(['offers', orderId], () =>
    publicApi.get(`/orders/${orderId}/offers`).then((response) => response.data)
  );

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <OrderWrapper>
      <ImageSlider images={order.images} />
      <div>
        <OrderRequestCount>
          {getOrderStatusText(order.orderStatus, order.offerCount)}
        </OrderRequestCount>
        <OrderTitle>{order.title}</OrderTitle>
        <PlaceOrderRequester>{order.region}</PlaceOrderRequester>
      </div>
      <DataTable
        title="케익 맛"
        value={convertBreadFlavor(order.cakeInfo.breadFlavor)}
      />
      <DataTable
        title="케익 카테고리"
        value={convertCakeCategory(order.cakeInfo.cakeCategory)}
      />
      <DataTable
        title="케익 높이"
        value={convertCakeHeight(order.cakeInfo.cakeHeight)}
      />
      <DataTable
        title="케익 사이즈"
        value={convertCakeSize(order.cakeInfo.cakeSize)}
      />
      <DataTable
        title="케익 크림 맛"
        value={convertCreamFlavor(order.cakeInfo.creamFlavor)}
      />
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
      {threads?.map((thread) => (
        <Thread key={thread.offerId} thread={thread} />
      ))}
    </OrderWrapper>
  );
}

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
