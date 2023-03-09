import { Box, Button, Card, Container, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { deleteOrder } from '../Api/Order';
import { IMypagePost } from './types';

export default function Post({
  id,
  imageUrl,
  orderStatus,
  title,
  visitTime,
}: IMypagePost) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();

  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['orderList']);
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (orderStatus === 'RESERVED') {
      console.log('cannot delete!');
      toast({
        status: 'error',
        description: '예약된 주문은 삭제할 수 없습니다',
        isClosable: true,
      });
    } else {
      deleteOrderMutation.mutate(id);
    }
  };

  return (
    <Container
      width="100"
      height="8rem"
      bgColor="hey.lightOrange"
      padding="1rem"
      marginBottom="1rem"
      borderRadius="10"
      boxShadow="4px 2px 2px lightGrey"
      display="flex"
      key={id}
      onClick={() => router.push(`/orders/${id}`)}
    >
      <Card width={74} height={74} shadow="none" marginTop={3}>
        {imageUrl && <Image src={imageUrl} alt="케이크 이미지" fill />}
      </Card>
      <Container marginTop={3}>
        <Box
          color="white"
          borderRadius="1rem"
          backgroundColor="hey.main"
          padding="0 1rem"
          width="fit-content"
          height={4}
          fontSize={4}
        >
          {orderStatus}
        </Box>
        <Container padding="0" marginTop={2}>
          <Text fontSize="1rem" fontWeight="bold" marginBottom={1}>
            {title}
          </Text>
          <Text color="gray">{visitTime.slice(0, -3)}</Text>
        </Container>
      </Container>
      <Button backgroundColor="hey.lightOrange" onClick={handleDelete}>
        X
      </Button>
    </Container>
  );
}
