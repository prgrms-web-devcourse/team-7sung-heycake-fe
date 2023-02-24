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
import { useState } from 'react';
import { BiCurrentLocation } from 'react-icons/bi';

import LocationListItem from './locationListItem';

export default function LocationSelectBox() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [location, setLocation] = useState('강남구');
  const SEOUL_AREA = [
    '강남구',
    '강동구',
    '강북구',
    '강서구',
    '관악구',
    '광진구',
    '구로구',
    '금천구',
    '노원구',
    '도봉구',
    '동대문구',
    '동작구',
    '마포구',
    '서대문구',
    '서초구',
    '성동구',
    '성북구',
    '송파구',
    '양천구',
    '영등포구',
    '용산구',
    '은평구',
    '종로구',
    '중구',
    '중량구',
  ];
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
