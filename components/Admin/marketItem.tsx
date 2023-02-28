import {
  Box,
  Card,
  CardBody,
  CloseButton,
  Divider,
  Flex,
  Switch,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function MarketItem({
  marketImage,
  marketName,
  businessNumber,
  status,
}: any) {
  const [marketSwitch, setMarketSwitch] = useState(false);

  const onSwitchHandler = () => {
    setMarketSwitch(!marketSwitch);
  };

  useEffect(() => {
    if (status === 'approved') {
      onSwitchHandler();
    }
  }, [status]);

  return (
    <Card
      borderColor="hey.sub"
      borderWidth="2px"
      bgColor="orange.50"
      direction="row"
      variant="outline"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box p={2} borderRadius="12px">
        <Image width={100} height={100} src={marketImage} alt="Cake" />
      </Box>
      <CardBody px={2}>
        <Flex padding={0} gap={3} flexDirection="column">
          <Flex align="center" gap={4} justifyContent="space-between">
            <Text>{marketName}</Text>
            <CloseButton bgColor="red.500" color="white" />
          </Flex>
          <Divider borderColor="hey.main" />
          <Flex align="center" gap={4} justifyContent="space-between">
            <Text fontWeight="600">{businessNumber}</Text>
            <Switch isChecked={marketSwitch} onChange={onSwitchHandler} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
