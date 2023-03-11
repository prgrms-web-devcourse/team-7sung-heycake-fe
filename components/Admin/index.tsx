import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';

import HeaderTitle from '../Shared/headerTitle';
import MarketList from './marketList';

export default function Admin() {
  return (
    <>
      <HeaderTitle title="신청 업체 관리" />
      <Flex>
        <Tabs colorScheme="heys" isLazy minW="350px" w="650px">
          <TabList alignItems="center" h="60px" p={2}>
            <Tab w="33%" h={14}>
              승인 목록
            </Tab>
            <Tab w="33%" h={14}>
              대기 목록
            </Tab>
            <Tab w="33%" h={14}>
              거절 목록
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <MarketList category="APPROVED" />
            </TabPanel>
            <TabPanel>
              <MarketList category="WAITING" />
            </TabPanel>
            <TabPanel>
              <MarketList category="DELETED" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}
