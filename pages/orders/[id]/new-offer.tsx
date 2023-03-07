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
} from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';

import { publicApi } from '@/components/Api';
import useClickInput from '@/hooks/useClickInput';
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

  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  } = useImageUpload(1);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken === null) {
      alert('로그인을 해주세요');
      return;
    }

    if (contentRef.current === null) {
      alert('오퍼 내용을 입력해 주세요');
      return;
    }

    if (expectedPrice < 10000) {
      alert('최소 예상 금액은 10,000원 이상이에요');
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
      alert('오퍼가 성공적으로 등록되었어요.');
      router.push(`orders/${orderId}`);
    } catch (error) {
      alert('오퍼 등록을 실패했어요. 다시 한번 확인해 주세요.');
      console.error(error);
    }
  };

  return (
    <form style={{ margin: '0 auto', padding: '1rem' }} onSubmit={handleSubmit}>
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
