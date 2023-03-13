import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';

import SEOUL_AREA from '@/constants/seoulArea';
import { LocationHeaderIcon, LocationIcon } from '@/public/icon';
import { LocationSelectBoxProps } from '@/types/Main';

import LocationListItem from './locationListItem';

export default function LocationSelectBox({
  location,
  setLocation,
}: LocationSelectBoxProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, SetSelectedLocation] = useState(location);
  const onLocationSelectHandler = () => {
    setLocation(selectedLocation);
    localStorage.setItem('location', selectedLocation);
    onClose();
  };

  return (
    <>
      <Flex
        onClick={onOpen}
        fontSize="sm"
        gap={1}
        p={4}
        pb={0}
        alignItems="center"
        fontWeight={600}
      >
        <LocationIcon h={6} w={6} />
        <Text pr={2} cursor="pointer">
          서울시 {location}
        </Text>
      </Flex>
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent
          h={{
            base: '70%',
            xl: '50%',
          }}
          borderTopRadius={16}
          style={{ margin: '0 auto', maxWidth: '600px' }}
        >
          <DrawerHeader cursor="default" p={0} px={4} mb={2}>
            <Grid alignContent="space-between" gap={4}>
              <LocationHeaderIcon justifySelf="center" w={20} />
              <Text fontSize="18px">희망 지역을 선택해주세요</Text>
            </Grid>
          </DrawerHeader>
          <DrawerBody>
            <Grid
              gap={4}
              gridTemplateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
              }}
            >
              {SEOUL_AREA.map((cityName) => (
                <LocationListItem
                  key={cityName}
                  name={cityName}
                  onClick={() => SetSelectedLocation(cityName)}
                />
              ))}
            </Grid>
          </DrawerBody>
          <DrawerFooter justifyContent="center" p={2}>
            <Button
              w="80%"
              minW="280px"
              h="60px"
              bg="hey.main"
              color="white"
              borderRadius={16}
              onClick={onLocationSelectHandler}
              _hover={{ backgroundColor: 'none' }}
            >
              선택
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
