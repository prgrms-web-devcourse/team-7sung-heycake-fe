import { Container } from '@chakra-ui/react';

import EnrollmentForm from '@/components/Mypage/enrollmentForm';
import HeaderTitle from '@/components/Shared/headerTitle';

export default function Enrollment() {
  return (
    <>
      <HeaderTitle title="업체 정보 등록" />
      <Container overflow="scroll" paddingTop={8}>
        <EnrollmentForm />
      </Container>
    </>
  );
}
