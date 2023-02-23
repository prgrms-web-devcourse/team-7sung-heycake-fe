import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
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
  const [location, setLocation] = useState('광진구');
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
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
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
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
                      onClose={onClose}
                      setLocation={setLocation}
                    />
                    <LocationListItem
                      name="강북구"
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
