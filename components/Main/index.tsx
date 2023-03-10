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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TAB_TABLE } from '@/constants/Main';
import { NewOrderIcon } from '@/public/icon';

import Header from '../Header';
import CakeList from './cake/cakeList';
import LocationSelectBox from './location/locationSelectBox';

export default function CakeMain() {
  const router = useRouter();
  const [location, setLocation] = useState('강남구');

  useEffect(() => {
    const localLocation = localStorage.getItem('location');
    if (localLocation) setLocation(localLocation as string);
  }, [router]);

  return (
    <>
      <Header />
      <Flex>
        <Tabs colorScheme="heys" isLazy minW="350px" w="100%" m={0}>
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
            <TabList
              alignItems="center"
              h="46px"
              pl={4}
              whiteSpace="nowrap"
              borderBottom={0}
              gap={5}
            >
              {TAB_TABLE.map((tab) => (
                <Tab
                  key={tab.label}
                  h="42px"
                  px={1}
                  pb={0}
                  _selected={{
                    fontWeight: '700',
                    color: 'hey.main',
                    borderBottom: '2px solid',
                  }}
                >
                  {tab.label}
                </Tab>
              ))}
            </TabList>
          </Box>
          <Flex gap={4} justifyContent="space-between">
            <LocationSelectBox location={location} setLocation={setLocation} />
          </Flex>
          <TabPanels>
            {TAB_TABLE.map((tab) => (
              <TabPanel key={tab.label}>
                <CakeList category={tab.category} location={location} />
              </TabPanel>
            ))}
          </TabPanels>
          <Link href="/orders/new">
            <Button
              w="52px"
              h="52px"
              colorScheme="heys"
              bg="hey.main"
              position="fixed"
              zIndex="10"
              borderRadius="104px"
              right={4}
              bottom={8}
              p={0}
            >
              <NewOrderIcon w={6} h={6} />
            </Button>
          </Link>
        </Tabs>
      </Flex>
    </>
  );
}
