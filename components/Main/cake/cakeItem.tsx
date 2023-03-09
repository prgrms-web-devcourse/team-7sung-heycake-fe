import { Card, CardBody, Flex, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { CAKE_CATEGORY, CAKE_SIZE } from '@/constants/Main';
import { ICakeItem } from '@/types/Main';
import numberWithCommas from '@/utils/numberWithCommas';

export default function CakeItem({
  category,
  cakeSize,
  image,
  price,
  status,
  visitTime,
  title,
  breadFlavor,
  creamFlavor,
}: ICakeItem) {
  return (
    <Card variant="unstyled" opacity={status !== 'NEW' ? '0.4' : '1'} p={0}>
      <Grid>
        <Flex>
          <Card
            variant="unstyled"
            width="100px"
            height="116px"
            borderRadius={8}
            overflow="hidden"
          >
            <Image
              fill
              sizes="20vw"
              src={image || '/images/sampleCake.jpg'}
              alt="Cake"
            />
          </Card>
          <CardBody ml={4}>
            <Text>{CAKE_CATEGORY[category]}</Text>
            <Text>{title}</Text>
            <Text>{CAKE_SIZE[cakeSize]}</Text>
            <Text>{breadFlavor}</Text>
            <Text>{creamFlavor}</Text>
            <Text>~ {numberWithCommas(Number(price))} 원</Text>
            <Text>{visitTime.substring(0, 10)}</Text>
          </CardBody>
        </Flex>
      </Grid>
    </Card>
  );
}
