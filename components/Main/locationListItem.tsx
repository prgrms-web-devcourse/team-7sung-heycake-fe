import { Button } from '@chakra-ui/react';

interface ILocationListItem {
  name: string;
  onClose: () => void;
  setLocation: (name: string) => void;
}
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
