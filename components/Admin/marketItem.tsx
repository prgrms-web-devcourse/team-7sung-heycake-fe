import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Switch,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';

export default function MarketItem() {
  const [marketSwitch, onMarketSwitch] = useState(false);
  /* console.log(marketSwitch); */

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
        <Image width={100} height={100} src="/images/prgms.png" alt="Cake" />
      </Box>
      <CardBody px={2}>
        <Flex padding={0} gap={2} flexDirection="column">
          <Flex align="center" gap={4} justifyContent="space-between">
            <Text fontSize="lg" fontWeight="700" color="hey.main">
              업체명
            </Text>
            <Text>프그케이크</Text>
          </Flex>
          <Divider borderColor="hey.main" />
          <Flex align="center" gap={4} justifyContent="space-between">
            <Text fontWeight="600">412-23-13145</Text>
            <Switch onChange={() => onMarketSwitch(!marketSwitch)} />
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
