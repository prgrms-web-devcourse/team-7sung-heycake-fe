import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import CakeList from './cakeList';
import LocationSelectBox from './locationSelectBox';
import { ICakeList } from './types';

export default function CakeMain() {
  // 이후 통신할 데이터 주소를 contents로 넣어서 활용
  // Sprint 4 이후 작업
  const DUMMY_DATA: ICakeList[] = [
    {
      label: '전체',
    },
    {
      label: '포토',
    },
    {
      label: '레터링',
    },
    {
      label: '캐릭터 - 그림',
    },
    {
      label: '캐릭터 - 입체',
    },
    {
      label: '기타',
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
          <TabPanel p={3} key={tab.label}>
            <Flex padding={0} gap={4} flexDirection="column">
              <CakeList category={tab.label} location="gangnam" />
            </Flex>
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
