import { Box, Flex, Heading, Tag } from '@chakra-ui/react';
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
        <Box fontSize="0.9rem" color="#777777">
          {order.region}
        </Box>
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
      <Box padding="2rem 0" fontSize="0.8rem">
        {order.cakeInfo.requirements}
      </Box>
      <Flex
        justifyContent="space-between"
        bg="#feebcb"
        padding="1.4rem"
        alignItems="center"
        fontWeight="bold"
        borderRadius="6px"
      >
        <Image
          alt="birthday-cake"
          src="/images/birthday-cake.png"
          width={40}
          height={40}
        />
        신청한 케이크 업체 {order.offerCount}개
        <Link
          style={{
            backgroundColor: '#f96400',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
          }}
          href="/orders/[orderId]/new-offer"
          as={`/orders/${orderId}/new-offer`}
        >
          신청하기
        </Link>
      </Flex>
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
