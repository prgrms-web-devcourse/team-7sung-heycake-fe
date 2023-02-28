import {
  Box,
  Card,
  CardBody,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Switch,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MarketItem({
  enrollmentId,
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
        <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
          <Image width={100} height={100} src={marketImage} alt="Cake" />
        </Link>
      </Box>
      <CardBody px={2}>
        <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
          <Flex padding={0} gap={3} flexDirection="column">
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text>{marketName}</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text fontWeight="600">{businessNumber}</Text>
            </Flex>
          </Flex>
        </Link>
      </CardBody>
      <Box px={2}>
        <Grid padding={0} gap={10}>
          <CloseButton bgColor="red.500" color="white" />
          <Switch isChecked={marketSwitch} onChange={onSwitchHandler} />
        </Grid>
      </Box>
    </Card>
  );
}
