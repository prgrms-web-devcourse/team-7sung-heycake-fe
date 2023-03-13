import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { publicApi } from '@/components/Api';
import RemoveImageButton from '@/components/Orders/RemoveImageButton';
import HeaderTitle from '@/components/Shared/headerTitle';
import ERROR_MESSAGES from '@/constants/errorMessages';
import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import { getAccessToken } from '@/utils/getAccessToken';

export default function NewOffer() {
  const router = useRouter();
  const { id: orderId } = router.query;
  const [expectedPrice, setExpectedPrice] = useState(30000);
  const [directInput, setDirectInput] = useState(false);
  const [inputRef, handleFileChoose] = useClickInput();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const accessToken = getAccessToken();
  const handleAxiosError = useHandleAxiosError();

  const handleSliderChange = (price: number) => {
    setExpectedPrice(price);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectInput(e.target.checked);
  };

  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    handleDeleteImage,
  } = useImageUpload(1);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (contentRef.current === null) return;

    if (accessToken === null) {
      toast({
        status: 'error',
        description: ERROR_MESSAGES.CHECK_LOGIN,
      });
      return;
    }

    if (contentRef.current.value === '') {
      toast({
        status: 'error',
        description: '오퍼 내용을 입력해 주세요',
      });
      return;
    }

    if (expectedPrice < 10000) {
      toast({
        status: 'error',
        description: '최소 금액은 10,000원 이상이에요',
      });
      return;
    }

    const newFormData = new FormData();
    newFormData.append('orderId', orderId as string);
    newFormData.append('expectedPrice', expectedPrice.toString());
    newFormData.append('content', contentRef.current.value);

    files.forEach((file) => {
      newFormData.append('offerImage', file);
    });

    try {
      await publicApi.post('/offers', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: accessToken,
        },
      });
      toast({
        status: 'success',
        description: '오퍼가 성공적으로 등록되었어요.',
      });
      router.push(`/orders/${orderId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HeaderTitle title="오퍼 신청" />
      <Box padding="0 20px" paddingBottom="2rem">
        <FormControl id="picture" padding="1rem 0">
          <FormLabel>사진</FormLabel>
          <Flex gap="1rem">
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              width="70px"
              height="70px"
              border="1px solid #e3e3e3"
              borderRadius="1rem"
              cursor="pointer"
              textAlign="center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={handleFileChoose}
            >
              <svg
                width="26"
                height="27"
                viewBox="0 0 26 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10.4545 3.69678C9.3499 3.69678 8.45447 4.59221 8.45447 5.69678V5.69678C8.45447 6.09844 8.12886 6.42406 7.72719 6.42406H4.09082C2.98625 6.42406 2.09082 7.31949 2.09082 8.42406V20.7877C2.09082 21.8923 2.98625 22.7877 4.09082 22.7877H21.9091C23.0136 22.7877 23.9091 21.8923 23.9091 20.7877V8.42406C23.9091 7.31949 23.0136 6.42406 21.9091 6.42406H18.2727C17.871 6.42406 17.5454 6.09844 17.5454 5.69678V5.69678C17.5454 4.59221 16.65 3.69678 15.5454 3.69678H10.4545Z"
                  fill="#E3E3E3"
                />
                <ellipse
                  cx="12.9997"
                  cy="14.6061"
                  rx="3.63637"
                  ry="3.63637"
                  fill="white"
                />
              </svg>
              <Flex fontSize="0.9rem">
                <Box color="hey.main">{files.length}</Box>
                /1
              </Flex>
              <input
                hidden
                ref={inputRef}
                type="file"
                multiple
                onChange={handleFileInputChange}
              />
            </Flex>
            <Flex alignItems="center" height="70px" gap="1rem">
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
          </Flex>
        </FormControl>
        <Flex
          flexDirection="column"
          paddingTop="2rem"
          gap="1rem"
          id="expectedPrice"
        >
          <FormControl
            display="flex"
            flexDirection="column"
            gap="1rem"
            id="expectedPrice"
          >
            <FormLabel>예상가격</FormLabel>
            <Slider
              min={10000}
              max={100000}
              step={5000}
              defaultValue={expectedPrice}
              value={directInput ? undefined : expectedPrice}
              onChange={handleSliderChange}
            >
              <SliderTrack bg="red.100">
                <Box position="relative" right={10} />
                <SliderFilledTrack bg="tomato" />
              </SliderTrack>
              <SliderThumb boxSize={6} />
            </Slider>
            <Input
              borderRadius="1rem"
              height="3rem"
              disabled={!directInput}
              type="text"
              name="expectedPrice"
              value={expectedPrice}
              onChange={(e) => setExpectedPrice(+e.target.value)}
              placeholder="예상가격을 입력하세요."
            />
            <Checkbox isChecked={directInput} onChange={handleCheckboxChange}>
              직접 입력
            </Checkbox>
          </FormControl>
          <FormControl padding="2rem 0" id="content">
            <FormLabel>요청사항</FormLabel>
            <Textarea
              borderRadius="1rem"
              padding="1rem"
              minH="182px"
              name="content"
              ref={contentRef}
              placeholder="제안사항을 입력하세요. 예) 저희가 예쁘게 만들어드릴게요."
            />
          </FormControl>
          <Button
            color="white"
            background="hey.main"
            height="3.75rem"
            borderRadius="1rem"
            type="submit"
            _hover={{ bg: 'hey.main' }}
          >
            등록
          </Button>
        </Flex>
      </Box>
    </form>
  );
}
