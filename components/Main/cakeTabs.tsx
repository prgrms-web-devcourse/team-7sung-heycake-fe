import { Tab, Tabs, TabList, TabPanels, TabPanel } from '@chakra-ui/react';

export default function DataTabs({ data }) {
  return (
    <Tabs colorScheme="heys">
      <TabList>
        {data.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
