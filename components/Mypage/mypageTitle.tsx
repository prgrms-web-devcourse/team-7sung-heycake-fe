/* eslint-disable react/prop-types */
import { Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { AiOutlineLeft } from 'react-icons/ai';

export default function MypageTitle({ ...props }) {
  const router = useRouter();

  return (
    <TitleContainer>
      {props.isSuccess === 'false' ? (
        <Text marginLeft="1.5rem" />
      ) : (
        <AiOutlineLeft fontSize={30} onClick={router.back} />
      )}

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
