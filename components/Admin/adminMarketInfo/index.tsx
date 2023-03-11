import { Box, Card, Container, Flex, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { getMarketDetail } from '@/components/Api/Market';
import ErrorPage from '@/components/Error';
import HeaderTitle from '@/components/Shared/headerTitle';
import KakaoMaps from '@/components/Shared/kakaoMaps';
import MarketProfileSkeleton from '@/components/Shared/marketProfileSkeleton';
import {
  MarketAddressIcon,
  MarketOpeningIcon,
  MarketTelIcon,
} from '@/public/icon';
import {
  numberWithHyphenMarket,
  numberWithHyphenPhone,
} from '@/utils/numberWithHyphen';

export default function AdminMarketInfo() {
  const router = useRouter();
  const id = router.query.id as string;
  const { status, data } = useQuery(
    ['업체 상세 정보', id],
    () => getMarketDetail({ enrollmentId: id }),
    {
      enabled: Boolean(router.query.id),
    }
  );

  if (status === 'loading' || router.isFallback) {
    return <MarketProfileSkeleton />;
  }

  if (status === 'error') {
    return <ErrorPage />;
  }

  const address = `${data.marketAddress.city} ${data.marketAddress.district}`;
  const openingHours = `${data.openTime} ~ ${data.endTime}`;

  return (
    <>
      <HeaderTitle title={data.marketName} />
      <Card w="100%" h={200} overflow="hidden" borderRadius={0}>
        <Image
          src={data.marketImage}
          alt="로고"
          fill
          sizes="40vh"
          style={{ objectFit: 'cover' }}
        />
      </Card>
      <Container px={5} pt={6} fontSize="sm" fontWeight={700}>
        <Box my={4}>
          <Text fontWeight={600}>사업자</Text>
          <Text ml={1} fontWeight={400}>
            {data.ownerName}
          </Text>
          <Text fontWeight={600} mt={2}>
            사업자 번호
          </Text>
          <Text ml={1} fontWeight={400}>
            {numberWithHyphenMarket(Number(data.businessNumber))}
          </Text>
        </Box>
        <Box h="92px">
          <Flex alignItems="flex-end">
            <MarketAddressIcon w={4} h={4} />
            <Text fontWeight={400}>
              {address} {data.marketAddress.detailAddress}
            </Text>
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
      </Container>
      <KakaoMaps address={address} title={data.marketName} />
      <Box h={24} p={4}>
        <Text fontWeight={600}>매장소개</Text>
        <Text mt={2} fontWeight={400}>
          {data.description}
        </Text>
      </Box>
    </>
  );
}
