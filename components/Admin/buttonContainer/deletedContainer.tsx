import { Button } from '@chakra-ui/react';

import { OnClickMarketStatus } from '@/types/Admin';

export default function DeletedContainer({
  onClickHandler,
}: OnClickMarketStatus) {
  return (
    <Button
      w="100%"
      h={12}
      fontWeight={500}
      bg="hey.main"
      color="white"
      borderRadius={16}
      onClick={() => onClickHandler('WAITING')}
      _hover={{ backgroundColor: 'none' }}
    >
      승인 대기로 변경
    </Button>
  );
}
