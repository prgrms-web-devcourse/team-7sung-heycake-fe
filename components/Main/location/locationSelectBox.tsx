import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { SEOUL_AREA } from '@/constants/Main';
import { LocationIcon } from '@/public/icon';
import { ILocationSelectBox } from '@/types/Main';

import LocationListItem from './locationListItem';

export default function LocationSelectBox({
  location,
  setLocation,
}: ILocationSelectBox) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        onClick={onOpen}
        fontSize="sm"
        gap={1}
        m={4}
        alignItems="center"
        fontWeight={600}
      >
        <LocationIcon h={6} w={6} />
        <Text pr={2} cursor="pointer">
          서울시 {location}
        </Text>
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="50%">
          <DrawerHeader borderBottomWidth="1px" cursor="default">
            지역을 선택해주세요
          </DrawerHeader>
          <DrawerBody>
            <Grid gap={3} py={2} gridTemplateColumns="repeat(2, 1fr)">
              {SEOUL_AREA.map((cityName) => (
                <LocationListItem
                  key={cityName}
                  name={cityName}
                  onClose={onClose}
                  setLocation={setLocation}
                />
              ))}
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
