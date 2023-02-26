import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import getCakeList from '../Api/getCakeList';
import CakeItem from './cakeItem';
import LocationSelectBox from './locationSelectBox';
import { ICakeList } from './types';

export default function CakeMain() {
  const data = getCakeList({
    location: 'gangnam',
    category: 'photo',
  });
  console.log(data);
  // 이후 통신할 데이터 주소를 contents로 넣어서 활용
  // Sprint 4 이후 작업
  const DUMMY_DATA: ICakeList[] = [
    {
      label: '전체',
      content: 'DUMMY_CAKE_LIST_ALL',
    },
    {
      label: '포토',
      content: 'DUMMY_CAKE_LIST_PHOTO',
    },
    {
      label: '레터링',
      content: 'DUMMY_CAKE_LIST_LATTER',
    },
    {
      label: '캐릭터 - 그림',
      content: 'DUMMY_CAKE_LIST_CHARACTER_PICTURE',
    },
    {
      label: '캐릭터 - 입체',
      content: 'DUMMY_CAKE_LIST_CHARACTER_3D',
    },
    {
      label: '기타',
      content: 'DUMMY_CAKE_LIST_ETC',
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
        {DUMMY_DATA.map((tab, index) => (
          <TabPanel p={3} key={tab.content}>
            <Flex padding={0} gap={4} flexDirection="column">
              {tab.content}
              {index}
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
