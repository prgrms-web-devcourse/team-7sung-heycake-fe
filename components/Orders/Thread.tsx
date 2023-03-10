import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import { ThreadDto } from '@/types/orders';
import numberWithCommas from '@/utils/numberWithCommas';

import OfferComments from './OfferComments';

interface ThreadProps {
  thread: ThreadDto;
  orderId: string;
  orderStatus: string;
}

export default function Thread({ thread, orderId, orderStatus }: ThreadProps) {
  const toast = useToast();

  return (
    <Flex
      w="100%"
      border="1px solid #e3e3e3"
      flexDirection="column"
      justifyContent="space-between"
      gap="1rem"
      minH="250px"
      borderRadius="1rem"
      fontSize="0.8rem"
      padding="1rem 1.4rem"
    >
      <Flex
        justifyContent="space-between"
        borderBottom="1px solid #e3e3e3"
        paddingBottom="1rem"
      >
        <Box fontSize="1.5rem">
          {thread.createDate ?? orderId ?? '23.03.11'}
        </Box>
        {orderStatus && (
          <Button
            style={{
              backgroundColor: '#f96400',
              color: 'white',
              padding: '10px',
              borderRadius: '5px',
            }}
            onClick={() =>
              toast({
                status: 'success',
                description: '개발 중이에요',
              })
            }
          >
            결제하기
          </Button>
        )}
      </Flex>
      <Flex justifyContent="space-between" alignItems="center">
        <Link
          style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center' }}
          href={`/market/${thread.enrollmentId}`}
        >
          {thread.marketName}
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="16" height="16" fill="white" />
            <path
              d="M6 3L10.9293 7.92929C10.9683 7.96834 10.9683 8.03166 10.9293 8.07071L6 13"
              stroke="#292929"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Link>
        <Box fontSize="1.1rem" fontWeight="bold">
          {numberWithCommas(thread.expectedPrice)}원
        </Box>
      </Flex>
      <Flex gap="1rem">
        <Image
          src={thread.imageUrl}
          width={72}
          height={72}
          style={{ borderRadius: '1rem' }}
          alt="cake"
          loading="lazy"
        />
        <Box>{thread.content}</Box>
      </Flex>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton bg="#F6F7FB" borderRadius="0.5rem">
            <Box
              as="span"
              flex="1"
              textAlign="left"
              color="#707070"
              fontSize="12px"
            >
              댓글 {thread.commentCount}개
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            <OfferComments offerId={thread.offerId} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Flex>
  );
}
