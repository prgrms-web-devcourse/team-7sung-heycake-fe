import { Button, Container } from '@chakra-ui/react';

export default function FilterBar() {
  return (
    <Container
      display="flex"
      justifyContent="space-around"
      paddingTop={4}
      borderBottom="2px solid"
      borderBottomColor="hey.lightGray"
    >
      <Button
        background="none"
        borderRadius={0}
        width={40}
        _hover={{ borderBottom: '3px solid orange', color: 'hey.main' }}
      >
        진행 중 주문
      </Button>
      <Button
        background="none"
        borderRadius={0}
        width={40}
        _hover={{ borderBottom: '3px solid orange', color: 'hey.main' }}
      >
        진행 완료 주문
      </Button>
    </Container>
  );
}
