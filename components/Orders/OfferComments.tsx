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
import axios, { AxiosError } from 'axios';
import Image from 'next/image';
import { useRef } from 'react';
import { AiFillDelete, AiFillFileAdd } from 'react-icons/ai';
import { GrPowerReset } from 'react-icons/gr';

import useClickInput from '@/hooks/useClickInput';
import useImageUpload from '@/hooks/useImageUpload';
import { OfferComment } from '@/types/offer';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '../Api';

interface ErrorResponse {
  message?: string;
}

export default function OfferComments({ offerId }: { offerId: number }) {
  const { previewUrls, files, handleFileInputChange, resetImages } =
    useImageUpload(1);
  const [inputRef, handleFileChoose] = useClickInput();
  const commentRef = useRef<HTMLInputElement>(null);
  const { data, isLoading, isError } = useQuery<OfferComment[]>(
    ['comments', offerId],
    () => publicApi.get(`/comments?offerId=${offerId}`).then((res) => res.data)
  );
  const accessToken = getAccessToken();

  const handleClick = async (commentId: number) => {
    await axios.delete(`/comments/${commentId}`);
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (isError) {
    return <Box>Error while fetching comments</Box>;
  }

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
    newFormData.append('comment', commentRef.current.value);

    files.forEach((file) => {
      newFormData.append('offerImage', file);
    });

    try {
      await publicApi.post('/comments', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: accessToken,
        },
      });
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (!axiosError.response) return;

      const errorMessage = JSON.parse(
        axiosError.response.data.message ?? '{}'
      ) as { message?: string };

      if (axiosError.response.status === 400) {
        alert(errorMessage.message || '검증에 실패했습니다.');
      } else if (axiosError.response.status === 401) {
        alert(errorMessage.message || '인증되지 않은 요청입니다.');
      } else if (axiosError.response?.status === 403) {
        alert(errorMessage.message || '접근 권한이 없습니다.');
      } else if (axiosError.response?.status === 404) {
        alert(errorMessage.message || '존재하지 않는 스레드입니다.');
      } else if (axiosError.response?.status === 500) {
        alert(
          errorMessage.message ||
            '서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
        );
      } else {
        alert(
          '해당 업체를 선택하는데에 예상치 못한 애러가 발생했어요. 다시 시도해 주세요.'
        );
      }
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
