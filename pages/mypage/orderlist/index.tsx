import { Box, Container, Spinner } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getOrderList } from '@/components/Api/Order';
import CountBar from '@/components/Mypage/countBar';
import FilterBar from '@/components/Mypage/filterBar';
import NotExist from '@/components/Mypage/notExist';
import Post from '@/components/Mypage/post';
import HeaderTitle from '@/components/Shared/headerTitle';
import { MypagePost } from '@/types/orders';

export default function Orderlist() {
  const [currStatus, setStatus] = useState<string>('NEW');

  const {
    data: orderList,
    isLoading,
    isError,
  } = useQuery<MypagePost[]>(['orderList', currStatus], () =>
    getOrderList({
      cursorId: null,
      pageSize: null,
      orderStatus: currStatus,
    })
  );
  if (isLoading) {
    return (
      <Spinner
        color="hey.main"
        size="xl"
        thickness="5px"
        speed="0.65s"
        position="fixed"
        top="40%"
        left="47%"
        transform="translate(-50%, -50%)"
        zIndex="4"
      />
    );
  }

  if (isError) {
    return <Box>Error while fetching orderList</Box>;
  }

  return (
    <>
      <HeaderTitle title="마이 주문 리스트" />
      <FilterBar setStatusFun={setStatus} status={currStatus} />
      <CountBar count={orderList.length} />
      <Container paddingTop={10} overflow="scroll">
        {orderList.length !== 0 ? (
          orderList.map((order) => <Post key={order.id} {...order} />)
        ) : (
          <NotExist />
        )}
      </Container>
    </>
  );
}
