import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Box,
  Flex,
} from '@chakra-ui/react';
import CakeItem from './cakeItem';
import SelectBox from './selectBox';

export default function CakeMain({ data }) {
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
          {data.map((tab, index) => (
            <Tab key={index} h="60px">
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Box>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={3} key={index}>
            <Flex padding={0} gap={4} flexDirection="column">
              {tab.content}
              <CakeItem />
              <CakeItem />
              <CakeItem isComplited />
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
