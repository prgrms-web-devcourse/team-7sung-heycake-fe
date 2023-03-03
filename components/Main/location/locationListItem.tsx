import { Button } from '@chakra-ui/react';

import { ILocationListItem } from '../types';

export default function LocationListItem({
  name,
  onClose,
  setLocation,
}: ILocationListItem) {
  return (
    <Button
      h={14}
      fontSize="2xl"
      bgColor="hey.lightOrange"
      onClick={() => {
        setLocation(name);
        window.localStorage.setItem('location', name);
        onClose();
      }}
    >
      {name}
    </Button>
  );
}
