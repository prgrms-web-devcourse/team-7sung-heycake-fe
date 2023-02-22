import Header from '@/components/Header';
import CakeMain from '@/components/Main/cakeMain';

export default function Main() {
  const DUMMY_DATA = [
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
    <>
      <Header />
      <CakeMain data={DUMMY_DATA} />
    </>
  );
}
