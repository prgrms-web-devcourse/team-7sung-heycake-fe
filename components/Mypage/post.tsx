import { Button, Card, Container, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import { MypagePost } from '@/types/orders';
import {
  convertCakeCategory,
  convertCakeHeight,
  convertCakeSize,
  convertCreamFlavor,
  getOrderStatusText,
} from '@/utils/orders';

import { deleteOrder } from '../Api/Order';

export default function Post({
  id,
  imageUrl,
  orderStatus,
  title,
  visitTime,
  createdAt,
  cakeInfo,
  hopePrice,
  count,
}: MypagePost) {
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
        <Card width={20}>{convertCakeCategory(cakeInfo.cakeCategory)}</Card>
        <Text>{title}</Text>
        <Text>
          {convertCakeSize(cakeInfo.cakeSize)}&nbsp;|&nbsp;
          {convertCakeHeight(cakeInfo.cakeHeight)}&nbsp;|&nbsp;
          {convertCreamFlavor(cakeInfo.creamFlavor)}
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
            {getOrderStatusText(orderStatus, count) !==
            ('선택 완료' || '거래 완료' || '알 수 없는 상태')
              ? `오퍼 ${getOrderStatusText(orderStatus, count)}`
              : getOrderStatusText(orderStatus, count)}
          </Text>
        </Container>
        <Button onClick={(e) => handleDelete(e)}>X</Button>
      </Container>
    </Container>
  );
}
