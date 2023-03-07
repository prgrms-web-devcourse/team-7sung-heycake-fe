import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
} from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';

import useSelectOffer from '@/hooks/useSelectOffer';
import { ThreadDto } from '@/types/orders';

import OfferComments from './OfferComments';

interface ThreadProps {
  thread: ThreadDto;
  orderId: string;
}

export default function Thread({ thread, orderId }: ThreadProps) {
  const selectOffer = useSelectOffer();

  return (
    <Flex
      w="100%"
      bg="rgb(239, 239, 240)"
      flexDirection="column"
      justifyContent="space-between"
      minH="350px"
      gap="2rem"
      borderRadius="1rem"
      fontSize="0.8rem"
      padding="2rem 1.4rem"
    >
      <Flex
        justifyContent="space-between"
        fontWeight="bold"
        alignItems="flex-end"
      >
        <Link
          style={{ fontSize: '1rem', textDecoration: 'underline' }}
          href="/market/[marketId]"
          as={`/market/${thread.marketId}`}
        >
          {thread.marketName}
        </Link>
        <Box fontSize="1.1rem">{thread.expectedPrice}원</Box>
      </Flex>
      <Image
        src={thread.imageUrl}
        width={150}
        height={150}
        alt="cake"
        loading="lazy"
      />
      <div>{thread.content}</div>
      <Button onClick={() => selectOffer(orderId, thread.offerId)}>
        해당 업체 선택
      </Button>
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {thread.commentCount}개 댓글 더 보기
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
