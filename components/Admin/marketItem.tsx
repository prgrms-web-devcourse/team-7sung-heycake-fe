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
import { useState } from 'react';

export default function MarketItem({
  marketImage,
  marketName,
  businessNumber,
  status,
}: any) {
  const [marketSwitch, onMarketSwitch] = useState(false);
  if (status === 'approve') onMarketSwitch(true);

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
            <Text fontSize="lg" fontWeight="700" color="hey.main">
              업체명
            </Text>
            <Flex gap={2} alignItems="center">
              <Text>{marketName}</Text>
              <CloseButton variant="custom" />
            </Flex>
          </Flex>
          <Divider borderColor="hey.main" />
          <Flex align="center" gap={4} justifyContent="space-between">
            <Text fontWeight="600">{businessNumber}</Text>
            <Flex gap={2}>
              <Text>승인</Text>
              <Switch
                isChecked
                onChange={() => onMarketSwitch(!marketSwitch)}
              />
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
