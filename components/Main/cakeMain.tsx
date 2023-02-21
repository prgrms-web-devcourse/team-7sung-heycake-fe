import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import CakeItem from './cakeItem';
import SelectBox from './selectBox';
import { ICakeList } from './types';

export default function CakeMain() {
  const DUMMY_DATA: ICakeList[] = [
    {
      label: '전체',
      content: '전체 케이크',
    },
    {
      label: '생크림',
      content: '생크림 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
    {
      label: '전체',
      content: '전체 케이크',
    },
    {
      label: '생크림',
      content: '생크림 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
  ];

  return (
    <Tabs colorScheme="heys">
      <Box
        overflow="scroll"
        sx={{
          '::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <TabList w="max-content" alignItems="center" h="60px" p={2}>
          <SelectBox />
          {DUMMY_DATA.map((tab, index) => (
            <Tab key={index} h="60px">
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Box>
      <TabPanels>
        {DUMMY_DATA.map((tab, index) => (
          <TabPanel p={3} key={index}>
            <Flex padding={0} gap={4} flexDirection="column">
              {tab.content}
              <CakeItem />
              <CakeItem />
              <CakeItem isCompleted />
              <CakeItem />
              <CakeItem />
              <CakeItem />
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}