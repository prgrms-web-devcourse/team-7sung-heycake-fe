import { Button, Flex } from '@chakra-ui/react';

import { OnClickMarketStatus } from '@/types/Admin';

export default function WaitingContainer({
  onClickHandler,
}: OnClickMarketStatus) {
  return (
    <Flex justifyContent="space-between" w="100%" gap="5%">
      <Button
        bg="white"
        w="50%"
        h={12}
        borderRadius={16}
        variant="outline"
        onClick={() => onClickHandler('DELETED')}
      >
        거절
      </Button>
      <Button
        bg="hey.main"
        color="white"
        w="50%"
        h={12}
        borderRadius={16}
        onClick={() => onClickHandler('APPROVED')}
      >
        승인
      </Button>
    </Flex>
  );
}
