import {
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

import ApprovedContainer from './buttonContainer/approvedContainer';
import DeletedContainer from './buttonContainer/deletedContainer';
import WaitingContainer from './buttonContainer/waitingContainer';

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

  const onClickHandler = (status: any) => {
    setIsDeleted(true);
    patchMarketStatus({ status, enrollmentId });
    queryClient.invalidateQueries(['승인 마켓 리스트', status]);
  };

  const buttonContainer = {
    APPROVED: <ApprovedContainer />,
    WAITING: <WaitingContainer onClickHandler={onClickHandler} />,
    DELETED: <DeletedContainer onClickHandler={onClickHandler} />,
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
        <Link key={enrollmentId} href={`/admin/${enrollmentId}`}>
          <Card variant="unstyled" width="72px" height="72px" overflow="hidden">
            <Image fill sizes="20vw" src={imageUrl} alt="MARKET" />
          </Card>
        </Link>
        <CardBody p={0} px={4}>
          <Link key={enrollmentId} href={`/admin/${enrollmentId}`}>
            <Text fontWeight="600">{marketName}</Text>
            <Text fontSize="sm" fontWeight="400" color="hey.darkGray">
              사업자 번호 {numberWithHyphenMarket(Number(businessNumber))}
            </Text>
          </Link>
        </CardBody>
      </Flex>
      <CardFooter p={2} px={4}>
        {buttonContainer[category]}
      </CardFooter>
    </Card>
  );
}
