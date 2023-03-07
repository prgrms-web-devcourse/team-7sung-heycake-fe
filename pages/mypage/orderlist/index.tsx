/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { getOrderList } from '@/components/Api/Order';
import MypageTitle from '@/components/Mypage/mypageTitle';
import Post from '@/components/Mypage/post';

export default function Orderlist() {
  const [orderList, setOrderList] = useState<any[]>([]);

  const [cursorId, setCursorId] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function saveOrderList() {
      const response = await getOrderList({ cursorId, pageSize, orderStatus });
      setOrderList(response);
    }
    saveOrderList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MypageTitle title="내 주문 리스트" isSuccess={false} />
      <Container paddingTop={10} overflow="scroll">
        {orderList?.length !== 0 ? (
          orderList?.map((order) => <Post key={order.id} {...order} />)
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
