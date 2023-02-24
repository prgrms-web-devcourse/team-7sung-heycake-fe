import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
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
        <DrawerContent h="60%">
          <DrawerHeader borderBottomWidth="1px">
            지역을 선택해주세요
          </DrawerHeader>
          <DrawerBody>
            <Accordion defaultIndex={[0]} allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      ㄱ ~ ㅁ
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid gap={3} gridTemplateColumns="repeat(3, 1fr)">
                    <LocationListItem
                      name="강남구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강동구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강서구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="관악구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="광진구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="구로구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="금천구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="노원구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="도봉구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="동대문구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="동작구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="마포구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left">
                      ㅂ ~ ㅈ
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Grid gap={3} gridTemplateColumns="repeat(3, 1fr)">
                    <LocationListItem
                      name="서대문구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="서초구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="성동구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="성북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="송파구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="양천구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="영등포구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="용산구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="은평구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="종로구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="중구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="중량구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                  </Grid>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
