import {
  Box,
  Button,
  Checkbox,
  Flex,
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
import { GrPowerReset } from 'react-icons/gr';

import { publicApi } from '@/components/Api';
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

  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  } = useImageUpload(1);
  const toast = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken === null) {
      toast({
        status: 'error',
        description: ERROR_MESSAGES.CHECK_LOGIN,
        isClosable: true,
      });
      return;
    }

    if (contentRef.current === null) {
      toast({
        status: 'error',
        description: '오퍼 내용을 입력해 주세요',
        isClosable: true,
      });
      return;
    }

    if (expectedPrice < 10000) {
      toast({
        status: 'error',
        description: '최소 금액은 10,000원 이상이에요',
        isClosable: true,
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
        isClosable: true,
      });
      router.push(`/orders/${orderId}`);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <form style={{ margin: '0 auto', padding: '1rem' }} onSubmit={handleSubmit}>
      <HeaderTitle title="오퍼 신청" />
      <Flex
        justifyContent="center"
        alignItems="center"
        height="150px"
        border="1px dashed grey"
        borderRadius="5px"
        cursor="poiner"
        margin="0 auto"
        textAlign="center"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileChoose}
      >
        드래그 앤 드랍 또는 클릭하여 파일을 추가하세요.
        <br />({files.length}/1)
        <input
          hidden
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
        />
      </Flex>
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
      <Flex
        flexDirection="column"
        paddingTop="2rem"
        gap="1rem"
        id="expectedPrice"
      >
        <FormLabel display="flex" justifyContent="space-between">
          예상가격
          <Checkbox
            isChecked={directInput}
            onChange={() => setDirectInput(!directInput)}
          >
            직접 입력
          </Checkbox>
        </FormLabel>
        <Slider
          defaultValue={30000}
          min={10000}
          max={100000}
          step={5000}
          value={expectedPrice}
          onChange={setExpectedPrice}
        >
          <SliderTrack bg="red.100">
            <Box position="relative" right={10} />
            <SliderFilledTrack bg="tomato" />
          </SliderTrack>
          <SliderThumb boxSize={6} />
        </Slider>
        <Input
          disabled={!directInput}
          type="number"
          name="expectedPrice"
          value={expectedPrice !== 0 ? expectedPrice : ''}
          onChange={(e) => setExpectedPrice(+e.target.value)}
          placeholder="희망가격을 입력하세요."
          min={10000}
          max={100000}
          step={5000}
        />
        <Textarea
          minH="200px"
          placeholder="오퍼 내용을 입력해 주세요"
          ref={contentRef}
        />
        <Button background="hey.sub" type="submit">
          전송하기
        </Button>
      </Flex>
    </form>
  );
}
