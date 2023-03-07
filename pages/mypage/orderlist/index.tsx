/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import getOrderList from '@/components/Api/Order';
import MypageTitle from '@/components/Mypage/mypageTitle';
import Post from '@/components/Mypage/post';

export default function Orderlist() {
  const [orderList, setOrderList] = useState<any[]>([]);

  const [cursorId, setCursorId] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

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
      <Container marginTop={10}>
        {orderList?.map((order) => (
          <Post {...order} />
        ))}
      </Container>
    </>
  );
}
