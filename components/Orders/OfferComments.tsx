import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef } from 'react';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';

import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import { OfferComment } from '@/types/offer';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '../Api';

export default function OfferComments({ offerId }: { offerId: number }) {
  const { previewUrls, files, handleFileInputChange, resetImages } =
    useImageUpload(1);
  const [inputRef, handleFileChoose] = useClickInput();
  const commentRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<OfferComment[]>(
    ['comments', offerId],
    () => publicApi.get(`/comments?offerId=${offerId}`).then((res) => res.data)
  );
  const accessToken = getAccessToken();
  const handleAxiosError = useHandleAxiosError();

  const removeCommentMutation = useMutation(
    (commentId: number) =>
      publicApi.delete(`/comments/${commentId}`, {
        headers: {
          access_token: accessToken,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', offerId]);
      },
    }
  );

  const addCommentMutation = useMutation(
    (formData: FormData) =>
      publicApi.post('/comments', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: accessToken,
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', offerId]);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken === null) {
      alert('로그인을 해주세요');
      return;
    }

    if (commentRef.current === null || commentRef.current === undefined) {
      alert('댓글 내용을 입력해 주세요');
      return;
    }

    const newFormData = new FormData();
    newFormData.append('offerId', offerId.toString());
    newFormData.append('content', commentRef.current.value);

    files.forEach((file) => {
      newFormData.append('image', file);
    });

    try {
      await addCommentMutation.mutateAsync(newFormData);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error while fetching comments</Box>;
  }

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
              onClick={() =>
                removeCommentMutation.mutateAsync(comment.commentId)
              }
            >
              삭제
            </Button>
          </Box>
          {comment.image && (
            <Image src={comment.image} alt="profile" width={50} height={50} />
          )}
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
                placeholder="댓글을 입력해 주세요"
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
              gap="1rem"
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
