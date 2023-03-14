import {
  Box,
  Button,
  Flex,
  FormControl,
  Image as ChakraImage,
  InputGroup,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import ERROR_MESSAGES from '@/constants/errorMessages';
import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import { OfferComment } from '@/types/offer';
import formatCommentDate from '@/utils/formatCommentDate';
import { getAccessToken } from '@/utils/getAccessToken';
import { getMemberIdFromToken } from '@/utils/getDecodeToken';

import { publicApi } from '../Api';
import RemoveImageButton from './RemoveImageButton';

export default function OfferComments({ offerId }: { offerId: number }) {
  const toast = useToast();
  const { previewUrls, files, handleFileInputChange, handleDeleteImage } =
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
  const [memberId, setMemberId] = useState<number | null>(null);

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
      onError: (error) => {
        handleAxiosError(error);
      },
    }
  );

  useEffect(() => {
    const handleSetMemberId = () => {
      if (accessToken) {
        const member = getMemberIdFromToken(accessToken);
        if (member) setMemberId(member);
      }
    };

    handleSetMemberId();
  }, [accessToken, memberId]);

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
      onError: (error) => {
        handleAxiosError(error);
      },
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken === null) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          status: 'error',
          description: ERROR_MESSAGES.CHECK_LOGIN,
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
      return;
    }

    if (commentRef.current === null || commentRef.current === undefined) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          status: 'error',
          description: '댓글 내용을 입력해 주세요',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
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
      commentRef.current.value = '';
    } catch (error) {
      handleAxiosError(error);
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          status: 'error',
          description: '댓글은 작성자와 사장님만 등록 가능해요',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
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
                {comment.nickname}
              </Box>
              {formatCommentDate(comment.createdAt)}
            </Flex>
            {comment.memberId === memberId && (
              <Button
                size="xs"
                onClick={() =>
                  removeCommentMutation.mutateAsync(comment.commentId)
                }
                bg="white"
                color="#707070"
                _hover={{ backgroundColor: 'none' }}
              >
                삭제
              </Button>
            )}
          </Box>
          <Box>{comment.comment}</Box>
          {comment.image && (
            <Image src={comment.image} alt="profile" width={50} height={50} />
          )}
        </Flex>
      ))}
      <form onSubmit={handleSubmit}>
        <FormControl borderTop="1px solid #e3e3e3" padding="1rem 0">
          <Flex justify="space-between" align="center" paddingBottom="1rem">
            <InputGroup size="md" gap="1rem">
              <Button
                h="44px"
                w="44px"
                onClick={handleFileChoose}
                bg="white"
                p={0}
                border="1px solid #e3e3e3"
                borderRadius="12px"
                _hover={{ bg: 'white' }}
              >
                <input
                  hidden
                  ref={inputRef}
                  type="file"
                  multiple
                  onChange={handleFileInputChange}
                />
                <ChakraImage
                  src="/images/cameraIcon.png"
                  width="24px"
                  height="24px"
                  alt="cameraIcon"
                />
              </Button>
              <Textarea
                minH="80px"
                bg="white"
                pr="4.5rem"
                fontSize="14px"
                borderRadius="1rem"
                placeholder="댓글을 작성해주세요."
                ref={commentRef}
              />
            </InputGroup>
          </Flex>
          <Button
            type="submit"
            bg="#efefef"
            float="right"
            _hover={{ backgroundColor: 'none' }}
          >
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
              {previewUrls.map((url, urlIndex) => (
                <Box position="relative" display="inline-block" key={url}>
                  <Button
                    width="70px"
                    height="70px"
                    onClick={() => handleDeleteImage(urlIndex)}
                    borderRadius="1rem"
                    padding="0"
                    bg="white"
                    _hover={{ backgroundColor: 'none' }}
                  >
                    <Image
                      key={url}
                      src={url}
                      alt="Preview"
                      width={70}
                      height={70}
                      style={{ borderRadius: '1rem' }}
                    />
                  </Button>
                  <RemoveImageButton
                    onClick={() => handleDeleteImage(urlIndex)}
                  />
                </Box>
              ))}
            </Flex>
          )}
        </FormControl>
      </form>
    </>
  );
}
