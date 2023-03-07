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

import { ILocationSelectBox } from '@/types/Main';

import { SEOUL_AREA } from '../../../constants/Main';
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
        fontSize="xl"
        fontWeight="700"
        gap={2}
        m={3}
        alignItems="center"
        w="200px"
      >
        <BiCurrentLocation color="orange" fontSize="xl" />
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
