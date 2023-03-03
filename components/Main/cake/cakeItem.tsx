import {
  Badge,
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

import { CAKE_CATEGORY, CAKE_SIZE } from '../constants';
import numberWithCommas from '../numberWithCommas';
import { ICakeItem } from '../types';

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
    <Card
      bgImage={status !== 'NEW' ? '/images/completedCake.png' : ''}
      bgPosition="center"
    >
      <Card
        borderColor="hey.sub"
        borderWidth="2px"
        bgColor="orange.50"
        variant="outline"
        opacity={status !== 'NEW' ? '0.4' : '1'}
      >
        <Grid>
          <Flex m={1} justifyContent="space-between">
            <Text ml={2} fontWeight="700">
              {title}
            </Text>
            <Badge mt={1} bgColor="red.200" color="hey.red">
              ~ {visitTime.substring(0, 10)}
            </Badge>
          </Flex>
          <Flex>
            <Card m={2} width="100px" height="100px">
              <Image fill src={image} alt="Cake" />
            </Card>
            <CardBody px={0}>
              <Flex padding={0} gap={1} flexDirection="column">
                <Flex align="center" gap={4} justifyContent="space-between">
                  <Text color="hey.main" whiteSpace="nowrap" fontWeight={700}>
                    항목
                  </Text>
                  <Text fontSize="sm" whiteSpace="nowrap">
                    {CAKE_CATEGORY[category]}
                  </Text>
                </Flex>
                <Divider borderColor="hey.main" />
                <Flex align="center" gap={4} justifyContent="space-between">
                  <Text color="hey.main" whiteSpace="nowrap" fontWeight={700}>
                    케익 크기
                  </Text>
                  <Text fontSize="sm" whiteSpace="nowrap">
                    {CAKE_SIZE[cakeSize]}
                  </Text>
                </Flex>
                <Divider borderColor="hey.main" />
              </Flex>
            </CardBody>
            <Flex flexDirection="column" h={30} p={2}>
              <Badge
                bgColor="orange.100"
                colorScheme="red"
                color="hey.red"
                mt={20}
              >
                ~ ₩ {numberWithCommas(Number(price))}
              </Badge>
            </Flex>
          </Flex>
        </Grid>
      </Card>
    </Card>
  );
}
