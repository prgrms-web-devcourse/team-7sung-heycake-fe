import {
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Select,
  Box,
} from '@chakra-ui/react';

export default function DataTabs({ data }) {
  return (
    <Tabs colorScheme="heys" isFitted>
      <Box overflow="hidden" w="max-content">
        <TabList>
          <Select
            color="hey.main"
            textColor="black"
            borderColor="hey.main"
            focusBorderColor="hey.main"
            borderWidth={2}
            placeholder="정렬 기준"
            w={32}
            onChange={(e) => {
              console.log(e.target.value);
            }}
          >
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Select>
          {data.map((tab, index) => (
            <Tab key={index} w={20}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
      </Box>
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
