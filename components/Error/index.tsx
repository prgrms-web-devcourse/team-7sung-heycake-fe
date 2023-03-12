import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ErrorPageIcon } from '@/public/icon';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <Grid alignContent="space-between" justifyContent="center">
      <Box />
      <ErrorPageIcon position="absolute" top="25%" left="25%" w="50%" h="20%" />
      <Box textAlign="center" position="absolute" top="55%" left="25%" w="50%">
        <Text fontSize="lg" fontWeight="600">
          시스템 점검 중입니다.
        </Text>
        <Text mt={4}>
          안정적인 서비스 제공을 위한 시스템 점검 작업 중이므로 잠시 후 다시
          접속해 주세요
        </Text>
      </Box>
      <Button
        bg="hey.main"
        color="white"
        onClick={() => router.replace('/main')}
        h={14}
        mx={4}
        px={40}
        mt="180%"
        borderRadius={16}
        _hover={{ backgroundColor: 'none' }}
      >
        홈 화면으로
      </Button>
    </Grid>
  );
}
