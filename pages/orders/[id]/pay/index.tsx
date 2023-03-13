import { Box, Button, Divider, Flex, Text, useToast } from '@chakra-ui/react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { randomBytes } from 'crypto';
import { GetServerSideProps } from 'next';

import { DataTable } from '@/components/Orders';
import HeaderTitle from '@/components/Shared/headerTitle';
import useSelectOffer from '@/hooks/useSelectOffer';
import numberWithCommas from '@/utils/numberWithCommas';

interface PayProps {
  id: string;
  threadOfferId: string;
  expectedPrice: string;
  marketName: string;
}

const orderId = randomBytes(16)
  .toString('base64')
  .replace(/[+/]/g, '-')
  .replace(/=/g, '')
  .slice(0, 64);

export default function Pay({
  id,
  threadOfferId,
  expectedPrice,
  marketName,
}: PayProps) {
  const selectOffer = useSelectOffer();
  const toast = useToast();

  return (
    <Box padding="1rem">
      <HeaderTitle title="주문/결제" />
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
        value={`${numberWithCommas(Number(expectedPrice))}원`}
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
          onClick={() => selectOffer(id, Number(threadOfferId), false)}
          _hover={{ backgroundColor: 'none' }}
        >
          <Box>만나서</Box> 직접 결제
        </Button>
        <Button
          bg="white"
          border="1px solid #e3e3e3"
          display="flex"
          flexDirection="column"
          minW="150px"
          minH="150px"
          _hover={{ backgroundColor: 'none' }}
          onClick={() => {
            loadTossPayments(
              process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string
            ).then((tossPayments) => {
              tossPayments
                .requestPayment('카드', {
                  amount: Number(expectedPrice),
                  orderId,
                  orderName: marketName,
                  customerName: '헤이 케이크',
                  successUrl: `https://heycake.vercel.app/orders/${id}/pay/success?threadOfferId=${threadOfferId}`,
                  failUrl: `https://heycake.vercel.app/orders/${id}/pay/fail`,
                })
                .catch((error) => {
                  if (error.code === 'USER_CANCEL') {
                    const toastId = 'error';
                    if (!toast.isActive(toastId)) {
                      toast({
                        id: toastId,
                        status: 'error',
                        description: '결제가 취소되었습니다.',
                        duration: 1000,
                        containerStyle: {
                          marginBottom: '60px',
                        },
                      });
                    }
                  } else if (error.code === 'INVALID_CARD_COMPANY') {
                    const toastId = 'error';
                    if (!toast.isActive(toastId)) {
                      toast({
                        id: toastId,
                        status: 'error',
                        description: '유효하지 않은 카드입니다.',
                        duration: 1000,
                        containerStyle: {
                          marginBottom: '60px',
                        },
                      });
                    }
                  }
                });
            });
          }}
        >
          <Box>카드로</Box> 지금 결제
        </Button>
      </Flex>
    </Box>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({
  props: {
    id: query.id,
    expectedPrice: query.expectedPrice,
    threadOfferId: query.threadOfferId,
    marketName: query.marketName,
  },
});
