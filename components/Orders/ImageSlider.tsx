import { Box, Button, Flex } from '@chakra-ui/react';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import { useState } from 'react';

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

interface ImageSliderProp {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProp) {
  const [[page, direction], setPage] = useState([0, 0]);
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    if (page === 0 && newDirection === -1) {
      setPage([2, newDirection]);
    } else if (page === 2 && newDirection === 1) {
      setPage([0, newDirection]);
    } else {
      setPage([page + newDirection, newDirection]);
    }
  };

  return (
    <Flex height="300px" overflow="hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex] ?? '/images/logo.png'}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          width={10000}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <Flex
          position="absolute"
          top="11%"
          width="100%"
          maxWidth="560px"
          margin="0 auto"
          justifyContent="space-between"
          alignItems=" center"
          padding=" 0 1rem"
        >
          <Button
            width="40px"
            height="40px"
            display="flex"
            justify-content="center"
            alignItems="center"
            userSelect="none"
            cursor="pointer"
            fontWeight="bold"
            fontSize="18px"
            padding="0"
            zIndex="2"
            bg="none"
            type="button"
            transform="scale(-1)"
            _hover={{ backgroundColor: 'none' }}
            _active={{ backgroundColor: 'none' }}
            onClick={() => paginate(-1)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.9">
                <path
                  opacity="0.2"
                  d="M9 5L15 12L9 19"
                  stroke="#292929"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </Button>
          <Button
            width="40px"
            height="40px"
            display="flex"
            justify-content="center"
            alignItems="center"
            userSelect="none"
            cursor="pointer"
            fontWeight="bold"
            fontSize="18px"
            padding="0"
            zIndex="2"
            bg="none"
            _hover={{ backgroundColor: 'none' }}
            _active={{ backgroundColor: 'none' }}
            type="button"
            onClick={() => paginate(1)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.9">
                <path
                  opacity="0.2"
                  d="M9 5L15 12L9 19"
                  stroke="#292929"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </Button>
          <Flex
            position="absolute"
            top="130px"
            width="45px"
            right="4%"
            zIndex="3"
            bg="rgba(0, 0, 0, 0.5)"
            color="white"
            padding="0.2rem 0.6rem"
            borderRadius="11.5px"
          >
            <Box w={2.5}>{page + 1}</Box>
            /3
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}
