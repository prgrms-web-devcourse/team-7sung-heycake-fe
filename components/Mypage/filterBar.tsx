import { Container } from '@chakra-ui/react';

export default function FilterBar() {
  return (
    <Container
      display="flex"
      justifyContent="space-around"
      paddingTop={4}
      borderBottom="2px solid"
      borderBottomColor="#EFEFEF"
    >
      <Container
        display="flex"
        justifyContent="center"
        background="none"
        borderRadius={0}
        width={40}
        fontSize="14px"
        padding={2}
        _hover={{ borderBottom: '3px solid orange', color: 'hey.main' }}
      >
        진행 중 주문
      </Container>
      <Container
        display="flex"
        justifyContent="center"
        background="none"
        borderRadius={0}
        width={40}
        padding={2}
        fontSize="14px"
        _hover={{ borderBottom: '3px solid orange', color: 'hey.main' }}
      >
        진행 완료 주문
      </Container>
    </Container>
  );
}
