import { Button } from '@chakra-ui/react';

import { LocationListItemProps } from '@/types/Main';

export default function LocationListItem({
  name,
  onClick,
}: LocationListItemProps) {
  return (
    <Button
      h={12}
      variant="outline"
      fontWeight={400}
      _focus={{
        color: 'hey.main',
        bg: 'white',
        fontWeight: '700',
        borderColor: 'hey.main',
      }}
      onClick={onClick}
      _hover={{ backgroundColor: 'none' }}
    >
      {name}
    </Button>
  );
}
