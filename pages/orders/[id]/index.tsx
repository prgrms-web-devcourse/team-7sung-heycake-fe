import { Flex, Heading, Tag } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

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

interface OrdersProps {
  order: Order;
  threads: ThreadDto[];
  orderId: string;
}

export default function Orders({ order, threads, orderId }: OrdersProps) {
  return (
    <Flex
      flexDirection="column"
      style={{ width: '100%', gap: '1rem', padding: '1rem' }}
    >
      <ImageSlider images={order.images} />
      <div>
        <Tag
          style={{
            color: 'white',
            backgroundColor: '#e53e3e',
            padding: '0 1rem',
            paddingBottom: '2px',
            borderRadius: '1rem',
          }}
        >
          {getOrderStatusText(order.orderStatus, order.offerCount)}
        </Tag>
        <Heading as="h1" size="xl">
          {order.title}
        </Heading>
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
        <ApplyButton
          href="/orders/[orderId]/new-offer"
          as={`/orders/${orderId}/new-offer`}
        >
          신청하기
        </ApplyButton>
      </OrderRequestCountCard>
      {threads?.map((thread) => (
        <Thread key={thread.offerId} thread={thread} orderId={orderId} />
      ))}
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const orderId = query.id as string;

  const orderResponse = await publicApi.get<Order>(`/orders/${orderId}`);
  const threadsResponse = await publicApi.get<ThreadDto[]>(
    `/orders/${orderId}/offers`
  );

  return {
    props: {
      orderId,
      order: orderResponse.data,
      threads: threadsResponse.data,
    },
  };
};

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

const ApplyButton = styled(Link)`
  background-color: #f96400;
  color: white;
  padding: 10px;
  border-radius: 5px;
`;
