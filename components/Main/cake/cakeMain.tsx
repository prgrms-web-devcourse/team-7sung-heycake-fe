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
          bgColor="white"
        >
          <TabList w="max-content" alignItems="center" h="50px" p={2}>
            {TAB_TABLE.map((tab) => (
              <Tab key={tab.label} h="50px">
                {tab.label}
              </Tab>
            ))}
          </TabList>
          <Flex
            gap={4}
            justifyContent="space-between"
            borderBottom="2px solid"
            borderColor="hey.sub"
          >
            <LocationSelectBox location={location} setLocation={setLocation} />
            <Link href="/orders/new">
              <Button w={24} h={10} colorScheme="heys" fontSize="3xl" m={2}>
                <MdPostAdd />
              </Button>
            </Link>
          </Flex>
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
