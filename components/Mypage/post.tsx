import { Button, Card, Container, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import useHandleAxiosError from '@/hooks/useHandleAxiosError';

import { deleteOrder } from '../Api/Order';
import { IMypagePost } from './types';

export default function Post({
  id,
  imageUrl,
  orderStatus,
  title,
  visitTime,
  createdAt,
  cakeInfo,
  hopePrice,
}: IMypagePost) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const toast = useToast();
  const handleAxiosError = useHandleAxiosError();

  const deleteOrderMutation = useMutation(deleteOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(['orderList']);
    },
    onError: (error) => {
      handleAxiosError(error);
    },
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (orderStatus === 'RESERVED') {
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
      marginBottom="1rem"
      key={id}
      onClick={() => router.push(`/orders/${id}`)}
    >
      <Text>
        주문번호 {createdAt.slice(0, 10).replaceAll('-', '').concat(id)}
      </Text>
      <Image
        src={imageUrl}
        width={70}
        height={70}
        quality={100}
        alt="케이크 이미지"
      />
      <Container>
        <Card width={20}>{cakeInfo.cakeCategory}</Card>
        <Text>{title}</Text>
        <Text>
          {cakeInfo.cakeSize}|{cakeInfo.creamFlavor}
        </Text>
        <Text>~{hopePrice}원</Text>
        <Container display="flex">
          <Image
            src="/images/CalenderIcon.png"
            width={20}
            height={10}
            alt="캘린더 아이콘"
          />
          {visitTime.slice(0, 10).replaceAll('-', '.')}
          <Text>
            <BsDot />
            {orderStatus}
          </Text>
        </Container>
        <Button onClick={(e) => handleDelete(e)}>X</Button>
      </Container>
    </Container>
  );
}
