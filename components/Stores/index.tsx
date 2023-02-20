import { Container, Text, Divider } from '@chakra-ui/react';
import Image from 'next/image';
import StoreTitle from './storetitle';

export default function StoreProfile() {
  return (
    <>
      <StoreTitle />
      <Container centerContent gap={6} padding={6}>
        <Image src="/images/prgms.png" alt="로고" width={240} height={240} />
        <Divider color="hey.lightGray" />
        <Container>
          <Text>업체 소개</Text>
          <Text>업체 소개 내용</Text>
        </Container>
        <Divider />
        <Container>
          <Text>주소</Text>
          <Text>주소 내용</Text>
        </Container>
        <Divider />
        <Container>
          <Text>전화번호</Text>
          <Text>전화번호 내용</Text>
        </Container>
        <Divider />
        <Container>
          <Text>영업 시간</Text>
          <Text>영업 시간 내용</Text>
        </Container>
        <Divider />
      </Container>
    </>
  );
}
