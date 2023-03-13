import { Container, Text } from '@chakra-ui/react';

interface EnrollmentProps {
  marketName: string;
  ownerName: string;
  phoneNumber: string;
}

export default function EnrollmentInfo({ ...props }: EnrollmentProps) {
  return (
    <Container
      display="flex"
      flexDir="column"
      alignItems="center"
      marginTop="8rem"
    >
      <Text fontSize="1.3rem" marginBottom={2}>
        상호명: <strong>{props.marketName}</strong>
      </Text>
      <Text fontSize="1.3rem" marginBottom={2}>
        대표자 이름: <strong>{props.ownerName}</strong>
      </Text>
      <Text fontSize="1.3rem" marginBottom={2}>
        업체 전화번호:<strong>{props.phoneNumber}</strong>
      </Text>
    </Container>
  );
}
