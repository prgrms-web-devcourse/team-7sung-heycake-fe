import { Container } from '@chakra-ui/react';

import EnrollmentForm from '@/components/Mypage/enrollmentForm';
import MypageTitle from '@/components/Mypage/mypageTitle';

export default function Enrollment() {
  return (
    <>
      <MypageTitle title="업체 정보 등록" isSuccess={false} />
      <Container overflow="scroll" paddingTop={8}>
        <EnrollmentForm />
      </Container>
    </>
  );
}
