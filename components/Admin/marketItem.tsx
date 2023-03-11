import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { patchMarketStatus } from '@/components/Api/Market';
import { IMarketItem } from '@/types/Admin';
import { numberWithHyphenMarket } from '@/utils/numberWithHyphen';

export default function MarketItem({
  category,
  enrollmentId,
  imageUrl,
  marketName,
  businessNumber,
  createdAt,
}: IMarketItem) {
  const [isDeleted, setIsDeleted] = useState(false);
  const queryClient = useQueryClient();

  const onRejectClickHandler = () => {
    setIsDeleted(true);
    patchMarketStatus({ status: 'DELETED', enrollmentId });
    queryClient.invalidateQueries(['승인 마켓 리스트', 'DELETED']);
  };

  const onApproveClickHandler = () => {
    setIsDeleted(true);
    patchMarketStatus({ status: 'APPROVED', enrollmentId });
  };

  const onWaitingClickHandler = () => {
    setIsDeleted(true);
    patchMarketStatus({ status: 'WAITING', enrollmentId });
    queryClient.invalidateQueries(['승인 마켓 리스트', 'WAITING']);
  };

  if (isDeleted) {
    return null;
  }

  return (
    <Card
      mb={6}
      h={60}
      borderColor="hey.lightGray"
      variant="outline"
      borderRadius={16}
    >
      <Text p={4}>{createdAt.substring(0, 10).replace(/-/g, '.')}</Text>
      <Divider mx="3%" w="94%" />
      <Flex p={4} alignItems="center">
        <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
          <Card variant="unstyled" width="72px" height="72px" overflow="hidden">
            <Image fill sizes="20vw" src={imageUrl} alt="MARKET" />
          </Card>
        </Link>
        <CardBody p={0} px={4}>
          <Link key={enrollmentId} href={`/market/${enrollmentId}`}>
            <Text fontWeight="600">{marketName}</Text>
            <Text fontSize="sm" fontWeight="400" color="hey.darkGray">
              사업자 번호 {numberWithHyphenMarket(Number(businessNumber))}
            </Text>
          </Link>
        </CardBody>
      </Flex>
      <CardFooter p={2} px={4}>
        {category === 'DELETED' ? (
          <Button
            w="100%"
            h={12}
            fontWeight={500}
            bg="hey.main"
            color="white"
            borderRadius={16}
            onClick={onWaitingClickHandler}
          >
            승인 대기로 변경
          </Button>
        ) : (
          <Flex justifyContent="space-between" w="100%" gap="5%">
            <Button
              bg="white"
              w="50%"
              h={12}
              borderRadius={16}
              variant="outline"
              onClick={onRejectClickHandler}
            >
              거절
            </Button>
            <Button
              bg="hey.main"
              color="white"
              w="50%"
              h={12}
              borderRadius={16}
              onClick={onApproveClickHandler}
            >
              승인
            </Button>
          </Flex>
        )}
      </CardFooter>
    </Card>
  );
}
