import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdPostAdd } from 'react-icons/md';

import { TAB_TABLE } from '../constants';
import LocationSelectBox from '../location/locationSelectBox';
import CakeList from './cakeList';

export default function CakeMain() {
  const [location, setLocation] = useState('강남구');

  useEffect(() => {
    const localLocation = window.localStorage.getItem('location');
    if (localLocation) {
      setLocation(localLocation);
    }
  }, []);

  return (
    <Flex justifyContent="center">
      <Tabs colorScheme="heys" isLazy minW="350px" w="max-content" m={0}>
        <Flex gap={4} justifyContent="space-between">
          <LocationSelectBox location={location} setLocation={setLocation} />
          <Link href="/orders/new">
            <Button
              position="fixed"
              w={24}
              h={10}
              mt={2}
              ml={-28}
              colorScheme="heys"
              fontSize="3xl"
              zIndex="20"
            >
              <MdPostAdd />
            </Button>
          </Link>
        </Flex>
        <Box
          overflow="scroll"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          position="sticky"
          top={0}
          zIndex="10"
          h="50px"
          bgColor="white"
        >
          <TabList w="max-content" alignItems="center" h="50px" p={2}>
            {TAB_TABLE.map((tab) => (
              <Tab key={tab.label} h="50px">
                {tab.label}
              </Tab>
            ))}
          </TabList>
        </Box>
        <TabPanels>
          {TAB_TABLE.map((tab) => (
            <TabPanel p={3} key={tab.label}>
              <CakeList category={tab.category} location={location} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
