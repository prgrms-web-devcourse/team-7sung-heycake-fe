/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AiOutlineLeft } from 'react-icons/ai';

export default function MypageTitle({ ...props }) {
  return (
    <TitleContainer>
      <AiOutlineLeft fontSize={30} />
      <Text fontSize="2xl" align="center" fontWeight="700">
        {props.title}
      </Text>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  margin: 1rem;
`;
