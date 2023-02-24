import { Container } from '@chakra-ui/react';

import MypageTitle from '@/components/Mypage/mypageTitle';
import Post from '@/components/Mypage/post';

export default function Orderlist() {
  return (
    <>
      <MypageTitle title="내 주문 리스트" />
      <Container marginTop={10}>
        <Post />
        <Post />
        <Post />
      </Container>
    </>
  );
}
