import Header from '@/components/Header';
import DataTabs from '@/components/Main/cakeTabs';
import { Flex } from '@chakra-ui/react';

export default function Home() {
  const tabData = [
    {
      label: '전체',
      content: '전체 케이크',
    },
    {
      label: '생크림',
      content: '초콜릿 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
    {
      label: '쵸코',
      content: '초콜릿 케이크',
    },
  ];

  return (
    <>
      <Header />
      <Flex>
        <DataTabs data={tabData} />
      </Flex>
    </>
  );
}
