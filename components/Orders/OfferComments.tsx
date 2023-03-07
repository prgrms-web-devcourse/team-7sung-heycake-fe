import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';
import { useRef } from 'react';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';

import useClickInput from '@/hooks/useClickInput';
import useImageUpload from '@/hooks/useImageUpload';
import { OfferComment } from '@/types/offer';

import { publicApi } from '../Api';

export default function OfferComments({ offerId }: { offerId: number }) {
  const { previewUrls, files, handleFileInputChange, resetImages } =
    useImageUpload(1);
  const [inputRef, handleFileChoose] = useClickInput();
  const commentRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError } = useQuery<OfferComment[]>(
    ['comments', offerId],
    () => publicApi.get(`/comments?offerId=${offerId}`).then((res) => res.data)
  );

  const handleClick = (commentId: number) => {
    axios.delete(`/comments/${commentId}`);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error while fetching comments</Box>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (commentRef.current === null || commentRef.current === undefined) {
      alert('댓글 내용을 입력해 주세요');
      return;
    }

    const newFormData = new FormData();
    newFormData.append('offerId', offerId.toString());
    newFormData.append('comment', commentRef.current.value);

    files.forEach((file) => {
      newFormData.append('offerImage', file);
    });

    try {
      await publicApi.post('/comments', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: process.env.NEXT_PUBLIC_MERKET_ACCESS_TOKEN,
        },
      });
    } catch (error) {
      alert('댓글 등록을 실패했어요. 다시 한번 확인해 주세요.');
      console.error(error);
    }
  };

  return (
    <>
      {data.map((comment) => (
        <Flex flexDirection="column" key={comment.commentId} gap="1rem">
          <Box display="flex" justifyContent="space-between">
            <p>{comment.comment}</p>
            <Button
              size="xs"
              colorScheme="red"
              leftIcon={<AiFillDelete />}
              onClick={() => handleClick(comment.commentId)}
            >
              삭제
            </Button>
          </Box>
          <Image src={comment.image} alt="profile" width={50} height={50} />
        </Flex>
      ))}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Flex justify="space-between" align="center">
            <InputGroup size="md">
              <Input
                ref={commentRef}
                bg="white"
                pr="4.5rem"
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleFileChoose}>
                  <input
                    hidden
                    ref={inputRef}
                    type="file"
                    multiple
                    onChange={handleFileInputChange}
                  />
                  <AiFillFileAdd />
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit">전송</Button>
          </Flex>
          {previewUrls.length !== 0 && (
            <Flex
              alignItems="center"
              width="95%"
              height="70px"
              margin="0 auto"
              gap="1"
            >
              {previewUrls.map((url) => (
                <Image
                  key={url}
                  src={url}
                  alt="Preview"
                  width={50}
                  height={50}
                  style={{ borderRadius: '10px' }}
                />
              ))}
              {files.length !== 0 && (
                <Button type="button" onClick={resetImages}>
                  <GrPowerReset />
                </Button>
              )}
            </Flex>
          )}
        </FormControl>
      </form>
    </>
  );
}
