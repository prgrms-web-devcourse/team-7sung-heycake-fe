import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import MarketList from './marketList';

export default function Admin() {
  return (
    <Tabs colorScheme="heys" isLazy>
      <TabList alignItems="center" h="60px" p={2}>
        <Tab w="50%" h="60px">
          승인 목록
        </Tab>
        <Tab w="50%" h="60px">
          거절 목록
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <MarketList category="" />
        </TabPanel>
        <TabPanel>
          <MarketList category="DELETE" />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
