import { Container } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

interface SetStatus {
  setStatusFun: Dispatch<SetStateAction<string>>;
  status: string;
}

export default function FilterBar({ setStatusFun, status }: SetStatus) {
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
        borderBottom={status === 'NEW' ? '3px solid orange' : 'none'}
        color={status === 'NEW' ? 'hey.main' : 'black'}
        onClick={() => setStatusFun('NEW')}
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
        borderBottom={status === 'PAID' ? '3px solid orange' : 'none'}
        color={status === 'PAID' ? 'hey.main' : 'black'}
        onClick={() => setStatusFun('PAID')}
      >
        진행 완료 주문
      </Container>
    </Container>
  );
}
