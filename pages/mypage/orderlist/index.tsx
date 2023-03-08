import { Box, Button, Container, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

import { getOrderList } from '@/components/Api/Order';
import MypageTitle from '@/components/Mypage/mypageTitle';
import Post from '@/components/Mypage/post';
import { IMypagePost } from '@/components/Mypage/types';

export default function Orderlist() {
  const router = useRouter();

  const { data: orderList, isError } = useQuery<IMypagePost[]>(
    ['orderList'],
    () => getOrderList({ cursorId: null, pageSize: null, orderStatus: null })
  );

  if (!orderList) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error while fetching orderList</Box>;
  }

  return (
    <>
      <MypageTitle title="내 주문 리스트" isSuccess={false} />
      <Container paddingTop={10} overflow="scroll">
        {orderList.length !== 0 ? (
          orderList.map((order) => <Post key={order.id} {...order} />)
        ) : (
          <Container display="flex" flexDir="column" alignItems="center">
            <Text fontSize="1.2rem" fontWeight="bold" margin="12rem 0 2rem 0">
              아직 주문이 존재하지 않아요!
            </Text>
            <Button
              fontSize="1.2rem"
              fontWeight="bold"
              marginTop="2rem"
              backgroundColor="hey.lightOrange"
              width="20rem"
              _hover={{ bg: 'hey.sub' }}
              onClick={() => router.push('/orders/new')}
            >
              주문 등록하러 가기
            </Button>
          </Container>
        )}
      </Container>
    </>
  );
}
