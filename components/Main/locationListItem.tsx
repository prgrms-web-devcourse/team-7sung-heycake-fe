import { Button } from '@chakra-ui/react';

import { ILocationListItem } from './types';

export default function LocationListItem({
  name,
  onClose,
  setLocation,
}: ILocationListItem) {
  return (
    <Button
      bgColor="hey.lightOrange"
      onClick={() => {
        setLocation(name);
        onClose();
      }}
    >
      {name}
    </Button>
  );
}
