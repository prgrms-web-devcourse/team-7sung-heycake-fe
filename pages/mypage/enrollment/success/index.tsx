import { Button, Container, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import EnrollmentInfo from '@/components/Mypage/enrollmentInfo';
import MypageTitle from '@/components/Mypage/mypageTitle';

export default function Success() {
  const router = useRouter();
  const { marketName, ownerName, phoneNumber } = router.query;
  return (
    <>
      <MypageTitle title="업체 정보 등록" isSuccess />
      <Container display="flex" flexDir="column" alignItems="center">
        <Text fontWeight={800} fontSize="1.3rem" margin="3rem 0 3rem 0">
          등록 신청이 완료되었습니다!
        </Text>
        <Container
          display="flex"
          flexDir="column"
          alignItems="center"
          bgColor="hey.lightOrange"
          width={350}
          height={400}
          marginBottom="3rem"
          borderRadius="10"
          borderColor="hey.sub"
          borderWidth="2px"
        >
          <EnrollmentInfo
            marketName={marketName}
            ownerName={ownerName}
            phoneNumber={phoneNumber}
          />
        </Container>
        <Button
          width={350}
          padding={1}
          bg="hey.lightOrange"
          fontSize="1.3rem"
          marginBottom={10}
          _hover={{ bg: 'hey.sub' }}
          onClick={() => router.push('/')}
        >
          메인 페이지로 이동
        </Button>
      </Container>
    </>
  );
}
