import {
  Badge,
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { publicApi } from '@/components/Api';
import { DataTable, ImageSlider, Thread } from '@/components/Orders';
import HeaderTitle from '@/components/Shared/headerTitle';
import { CAKE_CATEGORY } from '@/constants/Main';
import { Order, ThreadDto } from '@/types/orders';
import { Roles } from '@/types/role';
import { getAccessToken } from '@/utils/getAccessToken';
import { getRoleFromToken } from '@/utils/getDecodeToken';
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
  const accessToken = getAccessToken();
  const [role, setRole] = useState<Roles | null>(null);
  const router = useRouter();
  const toast = useToast();

  const handleButtonClick = () => {
    if (role === 'ROLE_ADMIN' || role === 'ROLE_MARKET') {
      router.push(`/orders/${orderId}/new-offer`);
    } else {
      toast({
        description: '사장님만 신청할 수 있어요',
        status: 'warning',
        duration: 3000,
      });
      toast({
        description: '사장님이시라면 마이페이지에서 신청하실 수 있어요',
        status: 'warning',
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    const handleSetRole = () => {
      if (accessToken) {
        const roleFromToken = getRoleFromToken(accessToken);
        if (roleFromToken) setRole(roleFromToken);
      }
    };

    handleSetRole();
  }, [accessToken]);

  return (
    <>
      <HeaderTitle title="" />
      <Box position="relative">
        {order.orderStatus !== 'NEW' && (
          <Flex
            justifyContent="center"
            alignItems="center"
            position="absolute"
            top={0}
            left={0}
            w="100%"
            h="100%"
            bg="rgba(0,0,0,0.2)"
            zIndex={4}
            color="white"
            fontSize="2rem"
          >
            주문 완료
          </Flex>
        )}
        <ImageSlider images={order.images} />
      </Box>
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
          <Box fontSize="1.2rem" color="hey.darkGray">
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
        {threads.map((thread) => (
          <Thread
            key={thread.offerId}
            thread={thread}
            orderId={orderId}
            order={order}
          />
        ))}
        {threads.length === 0 && (
          <Flex flexDir="column" alignItems="center" padding={4}>
            <Image
              src="/images/grayCakeIcon.png"
              alt="회색 케이크 아이콘"
              width={120}
              height={120}
            />
            <Flex flexDir="column" alignItems="center" padding={4}>
              <Text fontSize={20} fontWeight="600">
                아직 신청한 업체가 없어요!
              </Text>
              <Text fontSize={16} textAlign="center" padding="8px 0">
                사장님이시라면 신청하기 버튼을 눌러
                <br />
                주문확인서를 작성해보세요.
              </Text>
            </Flex>
          </Flex>
        )}
        {order.orderStatus === 'NEW' ? (
          <Button
            color="white"
            background="hey.main"
            height="3.75rem"
            borderRadius="1rem"
            type="submit"
            _hover={{ bg: 'hey.main' }}
            onClick={handleButtonClick}
          >
            신청하기
          </Button>
        ) : (
          <Button height="3.75rem" borderRadius="1rem" type="submit" isDisabled>
            신청 종료
          </Button>
        )}
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
