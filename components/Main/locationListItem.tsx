import { Button } from '@chakra-ui/react';

export default function LocationListItem({ name, onClose, setLocation }) {
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
