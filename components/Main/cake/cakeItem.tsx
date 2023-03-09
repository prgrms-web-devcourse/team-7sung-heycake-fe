import { Badge, Card, CardBody, Flex, Grid, Text } from '@chakra-ui/react';
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
          <CardBody px={0}>
            <Text ml={2} fontWeight="700">
              {title}
            </Text>
            <Badge mt={1} bgColor="red.200" color="hey.red">
              ~ {visitTime.substring(0, 10)}
            </Badge>
            <Text fontSize="sm" whiteSpace="nowrap">
              {CAKE_CATEGORY[category]}
            </Text>
            <Text fontSize="sm" whiteSpace="nowrap">
              {CAKE_SIZE[cakeSize]}
            </Text>
            <Badge bgColor="orange.100" colorScheme="red" color="hey.red">
              ~ ₩ {numberWithCommas(Number(price))}
            </Badge>
          </CardBody>
        </Flex>
      </Grid>
    </Card>
  );
}
