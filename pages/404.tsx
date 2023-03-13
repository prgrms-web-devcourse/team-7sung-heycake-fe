import { Box, Button, Grid, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { ErrorPageIcon } from '@/public/icon';

export default function NotFound() {
  const router = useRouter();

  return (
    <Grid alignContent="space-between" justifyContent="center">
      <Box />
      <ErrorPageIcon position="absolute" top="25%" left="25%" w="50%" h="20%" />
      <Box textAlign="center" position="absolute" top="55%" left="25%" w="50%">
        <Text fontSize="lg" fontWeight="600">
          NOT FOUND
        </Text>
        <Text mt={4}>
          요청하신 페이지를 찾을 수 없어요.
          <br /> 올바른 주소로 접속하셨나요?
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
