import {
  Box,
  Button,
  Flex,
  FormControl,
  InputGroup,
  InputRightElement,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRef } from 'react';
import { AiFillFileAdd } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';

import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import { OfferComment } from '@/types/offer';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '../Api';

export default function OfferComments({ offerId }: { offerId: number }) {
  const toast = useToast();
  const { previewUrls, files, handleFileInputChange, resetImages } =
    useImageUpload(1);
  const [inputRef, handleFileChoose] = useClickInput();
  const commentRef = useRef<HTMLTextAreaElement>(null);
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
      toast({
        status: 'error',
        description: '로그인을 해주세요',
        isClosable: true,
      });
      return;
    }

    if (commentRef.current === null || commentRef.current === undefined) {
      toast({
        status: 'error',
        description: '댓글 내용을 입력해 주세요',
        isClosable: true,
      });
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
        <Flex flexDirection="column" key={comment.commentId} padding="6px 0">
          <Box display="flex" justifyContent="space-between">
            <Flex gap="0.5rem" fontSize="10px" alignItems="center">
              <Box color="#707070" fontSize="14px">
                케이크 업체
              </Box>{' '}
              2023-03-12
            </Flex>
            <Button
              size="xs"
              onClick={() =>
                removeCommentMutation.mutateAsync(comment.commentId)
              }
              bg="white"
              color="#707070"
            >
              삭제
            </Button>
          </Box>
          <p>{comment.comment}</p>
          {comment.image && (
            <Image src={comment.image} alt="profile" width={50} height={50} />
          )}
        </Flex>
      ))}
      <form onSubmit={handleSubmit}>
        <FormControl borderTop="1px solid #e3e3e3" padding="1rem 0">
          <Flex justify="space-between" align="center" paddingBottom="1rem">
            <InputGroup size="md">
              <Textarea
                minH="80px"
                bg="white"
                pr="4.5rem"
                placeholder="댓글을 작성해주세요."
                ref={commentRef}
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
          </Flex>
          <Button type="submit" bg="#efefef" float="right">
            등록
          </Button>
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
