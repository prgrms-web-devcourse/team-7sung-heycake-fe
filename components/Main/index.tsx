import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import ERROR_MESSAGES from '@/constants/errorMessages';
import { TAB_TABLE } from '@/constants/Main';
import { NewOrderIcon } from '@/public/icon';
import { getAccessToken } from '@/utils/getAccessToken';

import CakeList from './cake/cakeList';
import Header from './header';
import LocationSelectBox from './location/locationSelectBox';

export default function CakeMain() {
  const router = useRouter();
  const [location, setLocation] = useState('강남구');
  const accessToken = getAccessToken();
  const toast = useToast();

  useEffect(() => {
    const localLocation = localStorage.getItem('location');
    if (localLocation) setLocation(localLocation as string);
  }, [router]);

  const handleNewOrderClick = () => {
    if (accessToken) {
      router.push('/orders/new');
    } else {
      toast({
        title: ERROR_MESSAGES.CHECK_LOGIN,
        status: 'error',
        duration: 3000,
      });
    }
  };

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
          <Button
            w="52px"
            h="52px"
            colorScheme="heys"
            bg="hey.main"
            position="fixed"
            zIndex="10"
            borderRadius="104px"
            right={{
              base: '24px',
              md: '120px',
              lg: '240px',
              xl: '30%',
              '2xl': '35%',
            }}
            bottom={8}
            p={0}
            onClick={handleNewOrderClick}
            _hover={{ backgroundColor: 'none' }}
          >
            <NewOrderIcon w={6} h={6} />
          </Button>
        </Tabs>
      </Flex>
    </>
  );
}
