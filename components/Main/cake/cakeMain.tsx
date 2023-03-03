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
import { useEffect, useState } from 'react';

import { TAB_TABLE } from '../constants';
import LocationSelectBox from '../location/locationSelectBox';
import CakeList from './cakeList';
import { MdPostAdd } from 'react-icons/md';
import Link from 'next/link';

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
      <Tabs colorScheme="heys" isLazy minW="350px" w="max-content">
        <Box
          overflow="scroll"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <TabList w="max-content" alignItems="center" h="60px" p={2}>
            <LocationSelectBox location={location} setLocation={setLocation} />
            {TAB_TABLE.map((tab) => (
              <Tab key={tab.label} h="60px">
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
        <Link href="/orders/new">
          <Button
            position="fixed"
            borderRadius={32}
            bottom={8}
            right={8}
            w={16}
            h={16}
            colorScheme="heys"
            fontSize="2xl"
          >
            <MdPostAdd />
          </Button>
        </Link>
      </Tabs>
    </Flex>
  );
}
