import {
  Box,
  Button,
  Card,
  CardBody,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import patchMarketStatus from '../Api/patchMarketStatus';

export default function MarketItem({
  category,
  enrollmentId,
  imageUrl,
  marketName,
  businessNumber,
  status,
}: any) {
  const [isDeleted, setIsDeleted] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  const onRejectClickHandler = () => {
    setIsDeleted(true);
    patchMarketStatus({ status: 'DELETED', enrollmentId });
  };

  const onApproveClickHandler = () => {
    setCurrentStatus('APPROVED');
    patchMarketStatus({ status: 'APPROVED', enrollmentId });
  };

  // (category === '' && status === 'DELETED') 는 백엔드 전체리스트 수정후 변경.

  if (isDeleted || (category === '' && status === 'DELETED')) {
    return null;
  }

  return (
    <Card
      mt={4}
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
          <Image width={100} height={100} src={imageUrl} alt="Cake" />
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
      {category !== 'DELETED' ? (
        <Box px={2}>
          {currentStatus === 'WAITING' ? (
            <Grid my={2} gap={10} justifyItems="flex-end">
              <CloseButton
                bgColor="red.500"
                color="white"
                onClick={onRejectClickHandler}
              />
              <Button colorScheme="heys" onClick={onApproveClickHandler}>
                승인
              </Button>
            </Grid>
          ) : (
            <Grid my={2} gap={10} justifyItems="flex-end">
              <CloseButton isDisabled bgColor="red.500" color="white" />
              <Button colorScheme="heys" isDisabled>
                승인됨
              </Button>
            </Grid>
          )}
        </Box>
      ) : (
        <Box />
      )}
    </Card>
  );
}
