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
import LocationSelectBox from './locationSelectBox';
import { ICakeList } from './types';

export default function CakeMain() {
  const DUMMY_DATA: ICakeList[] = [
    {
      label: '전체',
      content: '전체',
    },
    {
      label: '포토',
      content: '포토',
    },
    {
      label: '레터링',
      content: '레터링',
    },
    {
      label: '캐릭터 - 그림',
      content: '캐릭터 - 그림',
    },
    {
      label: '캐릭터 - 입체',
      content: '캐릭터 - 입체',
    },
    {
      label: '기타',
      content: '기타',
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
          <LocationSelectBox />
          {DUMMY_DATA.map((tab) => (
            <Tab key={tab.label} h="60px">
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Box>
      <TabPanels>
        {DUMMY_DATA.map((tab) => (
          <TabPanel p={3} key={tab.content}>
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
