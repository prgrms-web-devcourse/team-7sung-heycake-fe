import { Box, Button, Divider, Flex, Text } from '@chakra-ui/react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { randomBytes } from 'crypto';
import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { DataTable } from '@/components/Orders';
import useSelectOffer from '@/hooks/useSelectOffer';
import numberWithCommas from '@/utils/numberWithCommas';

interface PayProps {
  id: string;
  threadOfferId: number;
  expectedPrice: number;
  marketName: string;
}

const orderId = randomBytes(16).toString('base64');

export default function Pay({
  id,
  threadOfferId,
  expectedPrice,
  marketName,
}: PayProps) {
  const selectOffer = useSelectOffer();

  return (
    <Box padding="1rem">
      <Text
        bg="rgba(249, 100, 0, 0.2)"
        color="hey.main"
        p={5}
        borderRadius="0.5rem"
        marginBottom="2rem"
      >
        실제 결제가 되지 않는 테스트입니다.
      </Text>
      <DataTable
        color="black"
        title="총 주문 금액"
        value={`${numberWithCommas(expectedPrice)}원`}
      />
      <Divider borderBottomWidth={12} p={4} />
      <Box fontWeight="bold" p="2rem 0">
        결제 수단
      </Box>
      <Flex justifyContent="center" gap="1rem">
        <Button
          bg="white"
          border="1px solid #e3e3e3"
          display="flex"
          flexDirection="column"
          minW="150px"
          minH="150px"
          onClick={() => selectOffer(id, threadOfferId)}
        >
          <Image width="50" height="50" src="/images/cash.png" alt="cash" />
          <Box>만나서</Box> 직접 결제
        </Button>
        <Button
          bg="white"
          border="1px solid #e3e3e3"
          display="flex"
          flexDirection="column"
          minW="150px"
          minH="150px"
          onClick={() => {
            loadTossPayments(
              process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
            ).then((tossPayments) => {
              tossPayments
                .requestPayment('카드', {
                  amount: expectedPrice,
                  orderId,
                  orderName: marketName,
                  customerName: '헤이 케이크',
                  successUrl: `https://heycake.vercel.app/orders/${id}`,
                  failUrl: `https://heycake.vercel.app/orders/${id}`,
                })
                .catch((error) => {
                  if (error.code === 'USER_CANCEL') {
                    // 결제 고객이 결제창을 닫았을 때 에러 처리
                  } else if (error.code === 'INVALID_CARD_COMPANY') {
                    // 유효하지 않은 카드 코드에 대한 에러 처리
                  }
                });
            });
          }}
        >
          <Image width="50" height="50" src="/images/toss.png" alt="cash" />
          <Box>토스로</Box> 지금 결제
        </Button>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log(query);

  return {
    props: {
      id: query.id,
      expectedPrice: query.expectedPrice,
      threadOfferId: query.threadOfferId,
      marketName: query.marketName,
    },
  };
};
