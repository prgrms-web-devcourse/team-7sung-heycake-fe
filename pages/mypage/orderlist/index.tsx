import { Box, Container } from '@chakra-ui/react';
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
  const [status, setStatus] = useState<string>('NEW');

  const { data: orderList, isError } = useQuery<MypagePost[]>(
    ['orderList'],
    () => getOrderList({ cursorId: null, pageSize: null, orderStatus: null })
  );

  if (!orderList) {
    return <Box>Loading...</Box>;
  }
  const filteredOrderList = orderList.filter(
    (order) => order.orderStatus === status
  );

  if (isError) {
    return <Box>Error while fetching orderList</Box>;
  }

  return (
    <>
      <HeaderTitle title="마이 주문 리스트" />
      <FilterBar setStatusFun={setStatus} status={status} />
      <CountBar count={filteredOrderList.length} />
      <Container paddingTop={10} overflow="scroll">
        {filteredOrderList.length !== 0 ? (
          filteredOrderList.map((order) => (
            <Post key={order.id} {...order} count={orderList.length} />
          ))
        ) : (
          <NotExist />
        )}
      </Container>
    </>
  );
}
