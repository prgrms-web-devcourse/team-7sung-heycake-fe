import { Button } from '@chakra-ui/react';

interface ILocationListItem {
  name: string;
  onClose: string;
  setLocation: string;
}
export default function LocationListItem({ name, onClose, setLocation }: any) {
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
