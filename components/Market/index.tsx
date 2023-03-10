import { Box, Card, Container, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import {
  MarketAddressIcon,
  MarketOpeningIcon,
  MarketTelIcon,
} from '@/public/icon';
import { numberWithHyphenPhone } from '@/utils/numberWithHyphen';

import { getMarketDetail } from '../Api/Market';
import ApiErrorAlert from '../Shared/apiErrorAlert';
import MarketProfileSkeleton from './marketProfileSkeleton';
import MarketTitle from './marketTitle';

export default function MarketProfile() {
  const router = useRouter();
  const id = router.query.id as string;
  const { status, data } = useQuery(['업체 상세 정보', id], () =>
    getMarketDetail({ enrollmentId: id })
  );

  if (status === 'loading' || router.isFallback) {
    return <MarketProfileSkeleton />;
  }

  if (status === 'error') {
    return <ApiErrorAlert />;
  }

  const address = `${data.marketAddress.city} ${data.marketAddress.district} ${data.marketAddress.detailAddress}`;
  const openingHours = `${data.openTime} ~ ${data.endTime}`;

  return (
    <>
      <MarketTitle title={data.marketName} />
      <Card w="100%" h={200} overflow="hidden">
        <Image
          src={data.marketImage}
          alt="로고"
          fill
          sizes="40vh"
          style={{ objectFit: 'cover' }}
        />
      </Card>
      <Container px={5} pt={6} fontSize="sm" fontWeight={700}>
        <Box h="104px">
          <Flex alignItems="flex-end">
            <MarketAddressIcon w={4} h={4} />
            <Text fontWeight={400}>{address}</Text>
          </Flex>
          <Flex alignItems="flex-end">
            <MarketTelIcon w={4} h={4} />
            <Text fontWeight={400}>
              {numberWithHyphenPhone(data.phoneNumber)}
            </Text>
          </Flex>
          <Flex alignItems="flex-end">
            <MarketOpeningIcon w={4} h={4} />
            <Text fontWeight={400}>{openingHours}</Text>
          </Flex>
        </Box>
        <Box h={24}>
          <Text>매장소개</Text>
          <Text mt={2} fontWeight={400}>
            {data.description}
          </Text>
        </Box>
      </Container>
    </>
  );
}
