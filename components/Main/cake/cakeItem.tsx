import { Badge, Card, CardBody, Flex, Grid, Text } from '@chakra-ui/react';
import Image from 'next/image';

import { CAKE_CATEGORY, CAKE_SIZE } from '@/constants/Main';
import { DateCalenderIcon } from '@/public/icon';
import { ICakeItem } from '@/types/Main';
import numberWithCommas from '@/utils/numberWithCommas';
import { convertBreadFlavor, convertCreamFlavor } from '@/utils/orders';

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
  offerCount,
}: ICakeItem) {
  return (
    <Card variant="unstyled" my={2}>
      <Flex
        alignItems="center"
        borderBottom="2px solid"
        borderColor="hey.lightGray"
        height="154px"
        pb={6}
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
            colorScheme={category}
            p={1}
            px={2}
            borderRadius={10}
            fontWeight={500}
            fontSize="10px"
          >
            {CAKE_CATEGORY[category]}
          </Badge>
          <Grid gap={1} mt={1}>
            <Text fontSize="sm" fontWeight={500}>
              {title}
            </Text>
            <Flex>
              <Text fontSize="xs" color="hey.lightGray">
                {`${CAKE_SIZE[cakeSize]} · ${convertBreadFlavor(
                  breadFlavor
                )} · ${convertCreamFlavor(creamFlavor)}`}
              </Text>
            </Flex>
            <Text fontSize="sm" fontWeight={700}>
              ~ {numberWithCommas(Number(price))} 원
            </Text>
            <Flex color="gray" alignItems="center" gap={1}>
              <DateCalenderIcon />
              <Text fontSize="xs" fontWeight={300}>
                {`${visitTime.substring(0, 10).replace(/-/g, '.')}`}
              </Text>
              {Boolean(offerCount) && (
                <Text fontSize="xs" color="hey.main">
                  · 오퍼+{offerCount}
                </Text>
              )}
            </Flex>
          </Grid>
        </CardBody>
      </Flex>
    </Card>
  );
}
