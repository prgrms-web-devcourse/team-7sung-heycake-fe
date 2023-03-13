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
import { numberWithHyphenPhone } from '@/utils/numberWithHyphen';

export default function MarketProfile() {
  const router = useRouter();
  const id = router.query.id as string;
  const { status, data } = useQuery(
    ['업체 상세 정보', id],
    () => getMarketDetail({ enrollmentId: id }),
    {
      enabled: router.isReady,
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
      <Container px={5} pt={5} fontSize="sm" fontWeight={700}>
        <Box h="92px">
          <Flex>
            <MarketAddressIcon w={6} h={6} mb={1} />
            <Text fontWeight={400}>
              {address} {data.marketAddress.detailAddress}
            </Text>
          </Flex>
          <Flex>
            <MarketTelIcon w={6} h={6} mb={1} />
            <Text fontWeight={400}>
              {numberWithHyphenPhone(data.phoneNumber)}
            </Text>
          </Flex>
          <Flex>
            <MarketOpeningIcon w={6} h={6} mb={1} />
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
