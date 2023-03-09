import { Badge, Card, CardBody, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';

import {
  CAKE_CATEGORY,
  CAKE_CATEGORY_COLOR,
  CAKE_SIZE,
} from '@/constants/Main';
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
    <Card variant="unstyled" my={2}>
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderColor="hey.lightGray"
        height="154px"
      >
        <Card
          variant="unstyled"
          width="100px"
          height="116px"
          borderRadius={8}
          overflow="hidden"
          opacity={status !== 'NEW' ? '0.2' : '1'}
        >
          <Image
            fill
            sizes="20vw"
            src={image || '/images/sampleCake.jpg'}
            alt="Cake"
          />
        </Card>
        <CardBody ml={4}>
          <Badge
            colorScheme={CAKE_CATEGORY_COLOR[category]}
            p={1}
            px={2}
            borderRadius={10}
            fontWeight={500}
          >
            {CAKE_CATEGORY[category]}
          </Badge>
          <Text>{title}</Text>
          <Flex>
            <Text fontSize="sm">{CAKE_SIZE[cakeSize]}</Text>
            <Text fontSize="sm">{breadFlavor}</Text>
            <Text fontSize="sm">{creamFlavor}</Text>
          </Flex>
          <Text>~ {numberWithCommas(Number(price))} 원</Text>
          <Text>{visitTime.substring(0, 10)}</Text>
        </CardBody>
      </Flex>
    </Card>
  );
}
