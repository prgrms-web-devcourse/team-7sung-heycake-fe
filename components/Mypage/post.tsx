import { Badge, Button, Container, Text, useToast } from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BsDot } from 'react-icons/bs';

import { CAKE_CATEGORY_COLOR } from '@/constants/Main';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
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
  offerCount = 0,
}: MypagePost) {
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

    toast({
      id: 'success',
      status: 'success',
      duration: 1000,
      description: '주문 삭제가 완료되었습니다.',
      containerStyle: {
        marginBottom: '60px',
      },
    });

    deleteOrderMutation.mutate(id);
  };

  return (
    <Container
      marginBottom="4rem"
      key={id}
      onClick={() => router.push(`/orders/${id}`)}
      height={140}
      width={360}
      padding={0}
    >
      <Container display="flex" justifyContent="space-between">
        <Text fontSize={18} fontWeight="semibold">
          주문번호 {createdAt.slice(0, 10).replaceAll('-', '').concat(id)}
        </Text>
        {orderStatus === 'NEW' && (
          <Button
            onClick={(e) => handleDelete(e)}
            fontSize={12}
            background="none"
            color="hey.normalGray"
            _hover={{ backgroundColor: 'none' }}
          >
            삭제
          </Button>
        )}
      </Container>
      <Container display="flex" marginTop={2}>
        <Container width="240px" height="150px" borderRadius="7px" padding={0}>
          <Image
            src={imageUrl}
            width={120}
            height={120}
            quality={100}
            alt="케이크 이미지"
          />
        </Container>
        <Container>
          <Badge
            width={12}
            borderRadius="6px"
            display="flex"
            justifyContent="center"
            fontSize={12}
            marginBottom={1}
            padding={0}
            colorScheme={CAKE_CATEGORY_COLOR[cakeInfo.cakeCategory]}
          >
            {convertCakeCategory(cakeInfo.cakeCategory)}
          </Badge>
          <Text fontSize={14} marginBottom={1}>
            {title}
          </Text>
          <Text
            fontSize={12}
            color="hey.normalGray"
            display="flex"
            marginBottom={1}
          >
            {convertCakeSize(cakeInfo.cakeSize)}
            <BsDot />
            {convertCakeHeight(cakeInfo.cakeHeight)}
            <BsDot />
            {convertCreamFlavor(cakeInfo.creamFlavor)}
          </Text>
          <Text fontSize={14} fontWeight="bold" marginBottom={1}>
            ~{hopePrice}원
          </Text>
          <Container display="flex" marginBottom={1} padding={0}>
            <Image
              src="/images/CalenderIcon.png"
              width={20}
              height={10}
              alt="캘린더 아이콘"
            />
            <Text color="hey.normalGray" fontSize={12} display="flex">
              {visitTime.slice(0, 10).replaceAll('-', '.')}
              <BsDot />
            </Text>
            <Text color="hey.main" fontSize={12}>
              {getOrderStatusText(orderStatus, offerCount) !==
              ('선택 완료' || '거래 완료' || '알 수 없는 상태')
                ? `오퍼 ${getOrderStatusText(orderStatus, offerCount)}`
                : getOrderStatusText(orderStatus, offerCount)}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
}
