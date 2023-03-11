import { Button } from '@chakra-ui/react';

export default function ApprovedContainer() {
  return (
    <Button
      w="100%"
      h={12}
      bg="white"
      variant="outline"
      color="hey.main"
      borderColor="hey.main"
      borderRadius={16}
      isDisabled
    >
      승인 완료
    </Button>
  );
}
