/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { AiOutlineLeft } from 'react-icons/ai';

export default function MypageTitle({ ...props }) {
  return (
    <TitleContainer>
      <AiOutlineLeft fontSize={30} />
      <Text
        fontSize="2xl"
        marginLeft="4.5rem"
        fontWeight="700"
        paddingBottom="1rem"
        alignItems="center"
      >
        {props.title}
      </Text>
    </TitleContainer>
  );
}

const TitleContainer = styled.div`
  display: flex;
  margin: 1rem;
  border-bottom: 1px solid grey;
`;
