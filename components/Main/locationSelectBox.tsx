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
import { BiCurrentLocation } from 'react-icons/bi';

import { SEOUL_AREA } from './constants';
import LocationListItem from './locationListItem';
import { ILocationSelectBox } from './types';

export default function LocationSelectBox({
  location,
  setLocation,
}: ILocationSelectBox) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        onClick={onOpen}
        fontSize="xl"
        fontWeight="700"
        gap={1}
        alignItems="center"
      >
        <BiCurrentLocation fontSize="xl" />
        <Text pr={2}>서울시 {location}</Text>
      </Flex>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="50%">
          <DrawerHeader borderBottomWidth="1px">
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
