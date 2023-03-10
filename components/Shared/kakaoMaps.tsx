import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { KakaoMapsProps } from '@/types/Shared';

export default function KakaoMaps({ address, title }: KakaoMapsProps) {
  const router = useRouter();
  useEffect(() => {
    window.kakao?.maps.load(() => {
      const mapContainer = document.getElementById('map') as HTMLElement;
      const mapOption = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, mapOption);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(`${address}`, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = new kakao.maps.LatLng(
            Number(result[0].y),
            Number(result[0].x)
          );
          const marker = new kakao.maps.Marker({
            map,
            position: coords,
          });
          kakao.maps.event.addListener(marker, 'click', () => {
            router.push(
              `https://map.kakao.com/link/map/${result[0].y},${result[0].x}`
            );
          });
          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="width:150px;text-align:center;padding:6px 0;">${title}</div>`,
          });
          infowindow.open(map, marker);
          map.setCenter(coords);
        }
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex>
      <Box id="map" w="100%" h="180px" />
    </Flex>
  );
}
