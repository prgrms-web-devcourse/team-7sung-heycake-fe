import {
  Card,
  Image,
  Stack,
  CardBody,
  Badge,
  Text,
  Flex,
  Divider,
} from '@chakra-ui/react';

export default function CakeItem() {
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
      <Image
        p={2}
        borderRadius="12px"
        objectFit="cover"
        w="120px"
        h="120px"
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Cake"
      />
      <Stack>
        <CardBody p={0}>
          <Flex padding={0} gap={1} flexDirection="column">
            <Flex align="center" gap={4}>
              <Text color="hey.main">케익 모양</Text>
              <Text fontSize="sm">동그라미</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4}>
              <Text color="hey.main">케익 크기</Text>
              <Text fontSize="sm">1호</Text>
            </Flex>
            <Divider borderColor="hey.main" />
            <Flex align="center" gap={4}>
              <Text color="hey.main">케익 종류</Text>
              <Text fontSize="sm">화이트</Text>
            </Flex>
            <Divider borderColor="hey.main" />
          </Flex>
        </CardBody>
      </Stack>
      <Stack>
        <Flex
          flexDirection="column"
          justifyContent="space-between"
          alignItems="end"
          w={24}
          h={32}
          p={2}
        >
          <Badge bgColor="red.200" color="hey.red">
            ~1 일
          </Badge>
          <Badge bgColor="orange.100" colorScheme="red" color="hey.red">
            ~ ₩ 130,000
          </Badge>
        </Flex>
      </Stack>
    </Card>
  );
}
