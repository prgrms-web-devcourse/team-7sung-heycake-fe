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

import { patchMarketStatus } from '../Api/Market';
import {
  numberWithHyphenMarket,
  numberWithHyphenPhone,
} from './numberWithHyphen';
import { IMarketItem } from './types';

export default function MarketItem({
  category,
  enrollmentId,
  imageUrl,
  marketName,
  businessNumber,
  status,
  phoneNumber,
}: IMarketItem) {
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
      variant="outline"
    >
      <Grid>
        <Flex m={1} justifyContent="space-between">
          <Text ml={2} fontWeight="700">
            {marketName}
          </Text>
        </Flex>
        <Flex>
          <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
            <Card m={2} width="100px" height="100px">
              <Image fill src={imageUrl} alt="MARKET" />
            </Card>
          </Link>
          <CardBody px={0}>
            <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
              <Flex padding={0} gap={3} flexDirection="column">
                <Text fontSize="sm" fontWeight="600">
                  {numberWithHyphenPhone(phoneNumber)}
                </Text>
                <Divider borderColor="hey.main" />
                <Text fontSize="sm" fontWeight="600">
                  {numberWithHyphenMarket(businessNumber)}
                </Text>
              </Flex>
            </Link>
          </CardBody>
          {category !== 'DELETED' ? (
            <Box px={2}>
              {currentStatus === 'WAITING' ? (
                <Grid my={2} gap={6} justifyItems="flex-end">
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
                <Grid my={2} gap={6} justifyItems="flex-end">
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
        </Flex>
      </Grid>
    </Card>
  );
}
