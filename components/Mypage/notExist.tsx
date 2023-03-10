import { Button, Container, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function NotExist() {
  return (
    <Container
      display="flex"
      flexDir="column"
      alignItems="center"
      marginTop={28}
    >
      <Image
        src="/images/grayCakeIcon.png"
        alt="회색 케이크 아이콘"
        width={120}
        height={120}
      />
      <Container
        display="flex"
        flexDir="column"
        alignItems="center"
        marginTop={10}
      >
        <Text fontSize={18} fontWeight="medium">
          아직 주문하지 않으셨네요!
        </Text>
        <Text fontSize={16}>
          주문 신청을 완료하고
          <br /> 다시 클릭해 주세요.
        </Text>
      </Container>
      <Button
        width={340}
        height={14}
        backgroundColor="hey.main"
        color="white"
        borderRadius={10}
        fontSize={16}
        fontWeight="medium"
        marginTop={36}
      >
        주문하러 가기
      </Button>
    </Container>
  );
}
