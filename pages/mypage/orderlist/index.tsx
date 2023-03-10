import { Box, Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';

import { getOrderList } from '@/components/Api/Order';
import CountBar from '@/components/Mypage/countBar';
import FilterBar from '@/components/Mypage/filterBar';
import MypageTitle from '@/components/Mypage/mypageTitle';
import NotExist from '@/components/Mypage/notExist';
import Post from '@/components/Mypage/post';
import { IMypagePost } from '@/components/Mypage/types';

export default function Orderlist() {
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
      <MypageTitle title="마이 주문 리스트" isSuccess={false} />
      <FilterBar />
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
