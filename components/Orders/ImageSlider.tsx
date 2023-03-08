import { Box } from '@chakra-ui/react';
import styled from '@emotion/styled';
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
    setPage([page + newDirection, newDirection]);
  };
  return (
    <Wrapper>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={page}
          src={images[imageIndex]}
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
        <ButtonGroup>
          <PrevButton
            type="button"
            className="prev"
            onClick={() => paginate(-1)}
          >
            ‣
          </PrevButton>{' '}
          <NextButton type="button" onClick={() => paginate(1)}>
            ‣
          </NextButton>
        </ButtonGroup>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: flex;
  height: 250px;
  overflow: hidden;
`;

const ButtonGroup = styled(Box)`
  top: calc(8%);
  position: fixed;
  display: flex;
  z-index: 1;
  width: 100%;
  max-width: 560px;
  height: 210px;
  margin: 0 auto;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const NextButton = styled.button`
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
`;

const PrevButton = styled.button`
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
  transform: scale(-1);
`;
