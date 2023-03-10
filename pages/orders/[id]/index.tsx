import { Badge, Box, Flex } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';

import { publicApi } from '@/components/Api';
import { DataTable, ImageSlider, Thread } from '@/components/Orders';
import { CAKE_CATEGORY } from '@/constants/Main';
import { Order, ThreadDto } from '@/types/orders';
import numberWithCommas from '@/utils/numberWithCommas';
import {
  convertBreadFlavor,
  convertCakeHeight,
  convertCakeSize,
  convertCreamFlavor,
} from '@/utils/orders';

interface OrdersProps {
  order: Order;
  threads: ThreadDto[];
  orderId: string;
}

export default function Orders({ order, threads, orderId }: OrdersProps) {
  return (
    <>
      <ImageSlider images={order.images} />
      <Flex flexDirection="column" width="100%" gap="1rem" padding="1rem">
        <Flex flexDirection="column" alignItems="center" gap="0.1rem">
          <Badge
            colorScheme={order.cakeInfo.cakeCategory}
            p={1}
            px={2}
            borderRadius={10}
            fontWeight={500}
            fontSize="10px"
          >
            {CAKE_CATEGORY[order.cakeInfo.cakeCategory]}
          </Badge>
          <Box fontSize="2rem" fontWeight="600">
            {order.title}
          </Box>
          <Box fontSize="1.2rem" color="#777777">
            {order.region}
          </Box>
        </Flex>
        <Box fontSize="1.4rem" fontWeight="700" paddingTop="1rem">
          주문 요약
        </Box>
        <Box bg="#f8f8f8" padding="2rem" borderRadius="1rem">
          <DataTable
            title="희망 가격"
            value={`~ ${numberWithCommas(order.hopePrice)}원`}
          />
          <DataTable title="방문 예정 시간" value={order.visitDate} />
          <DataTable
            title="케이크 맛"
            value={convertBreadFlavor(order.cakeInfo.breadFlavor)}
          />
          <DataTable
            title="케이크 높이"
            value={convertCakeHeight(order.cakeInfo.cakeHeight)}
          />
          <DataTable
            title="케이크 크기"
            value={convertCakeSize(order.cakeInfo.cakeSize)}
          />
          <DataTable
            title="크림 맛"
            value={convertCreamFlavor(order.cakeInfo.creamFlavor)}
          />
        </Box>
        <Box fontSize="1.4rem" fontWeight="700" paddingTop="1rem">
          요청사항
        </Box>
        <Box padding="1rem 0">{order.cakeInfo.requirements}</Box>
        <Flex fontSize="1.4rem" fontWeight="700" gap="0.5rem" paddingTop="1rem">
          신청한 케이크 업체 <Box color="hey.main">{order.offerCount}</Box>
        </Flex>
        {threads?.map((thread) => (
          <Thread key={thread.offerId} thread={thread} orderId={orderId} />
        ))}
      </Flex>
    </>
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
