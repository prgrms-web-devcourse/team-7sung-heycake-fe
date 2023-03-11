import { Button } from '@chakra-ui/react';

export default function DeletedContainer({ onClickHandler }: any) {
  return (
    <Button
      w="100%"
      h={12}
      fontWeight={500}
      bg="hey.main"
      color="white"
      borderRadius={16}
      onClick={() => onClickHandler('WAITING')}
    >
      승인 대기로 변경
    </Button>
  );
}
