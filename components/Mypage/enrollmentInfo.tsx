import { Container, Text } from '@chakra-ui/react';
import Image from 'next/image';

export default function EnrollmentInfo() {
  return (
    <Container display="flex" flexDir="column" alignItems="center" margin={16}>
      <Image
        alt="업체 이미지"
        src="/images/cake.png"
        width={100}
        height={100}
      />
      <Text fontSize="1rem" margin="5px 0 5px 0">
        상호명: 지연케이크
      </Text>
      <Text fontSize="1rem" marginBottom={1}>
        대표자 이름: 허지연
      </Text>
      <Text fontSize="1rem" marginBottom={1}>
        업체 전화번호: 02-111-1111
      </Text>
      <Text fontSize="1rem" marginBottom={1}>
        영업 시간: 13:00 - 19:00
      </Text>
      <Text fontSize="1rem" marginBottom={1}>
        업체 설명: 레터링 케이크 전문점입니다.
      </Text>
    </Container>
  );
}
