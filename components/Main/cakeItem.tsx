import {
  Badge,
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';

export default function CakeItem({
  title,
  category,
  cakeSize,
  image,
  price,
  status,
  endDate,
}: any) {
  return (
    <Card
      bgImage={status === 'RESERVED' ? '/images/completedCake.png' : ''}
      bgPosition="center"
    >
      <Card
        borderColor="hey.sub"
        borderWidth="2px"
        bgColor="orange.50"
        direction="row"
        variant="outline"
        alignItems="center"
        justifyContent="space-between"
        opacity={status === 'RESERVED' ? '0.4' : '1'}
      >
        <Box p={2} borderRadius="12px">
          <Image width={100} height={100} src={image} alt="Cake" />
        </Box>
        <CardBody px={2}>
          <Flex padding={0} gap={1} flexDirection="column">
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text>{title}</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text color="hey.main">카테고리</Text>
              <Text fontSize="sm">{category}</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4} justifyContent="space-between">
              <Text color="hey.main">케익 크기</Text>
              <Text fontSize="sm">{cakeSize}</Text>
            </Flex>
            <Divider borderColor="hey.main" />
          </Flex>
        </CardBody>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
          w={24}
          h={32}
          p={2}
        >
          <Badge bgColor="red.200" color="hey.red">
            ~ {endDate}
          </Badge>
          <Badge bgColor="orange.100" colorScheme="red" color="hey.red">
            ~ ₩ {price}
          </Badge>
        </Flex>
      </Card>
    </Card>
  );
}
