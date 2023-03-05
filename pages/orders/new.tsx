import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { publicApi } from '@/components/Api';
import useImageUpload from '@/hooks/useImageUpload';
import {
  BreadFlavor,
  CakeCategory,
  CakeHeight,
  CakeSize,
  CreamFlavor,
} from '@/types/orders';
import {
  convertBreadFlavor,
  convertCakeCategory,
  convertCakeHeight,
  convertCakeSize,
  convertCreamFlavor,
} from '@/utils/orders';

export default function NewOrder() {
  const [formData, setFormData] = useState({
    title: '',
    hopePrice: '',
    region: '',
    visitTime: '',
    cakeCategory: 'ALL',
    cakeSize: 'MINI',
    cakeHeight: 'ONE_LAYER',
    breadFlavor: 'VANILLA',
    creamFlavor: 'WHIPPED_CREAM',
    requirements: '',
  });
  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  } = useImageUpload();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChoose = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFormData = new FormData();
    newFormData.append('title', formData.title);
    newFormData.append('hopePrice', formData.hopePrice);
    newFormData.append('region', formData.region);
    newFormData.append('visitTime', formData.visitTime);
    newFormData.append('cakeCategory', formData.cakeCategory);
    newFormData.append('cakeSize', formData.cakeSize);
    newFormData.append('cakeHeight', formData.cakeHeight);
    newFormData.append('breadFlavor', formData.breadFlavor);
    newFormData.append('creamFlavor', formData.creamFlavor);
    newFormData.append('requirements', formData.requirements);

    files.forEach((file) => {
      newFormData.append(`cakeImages`, file);
    });

    try {
      await publicApi.post('/orders', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string, name: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const {
    title,
    hopePrice,
    region,
    visitTime,
    cakeCategory,
    cakeSize,
    cakeHeight,
    breadFlavor,
    creamFlavor,
    requirements,
  } = formData;

  return (
    <form onSubmit={handleSubmit}>
      <UploadContainer
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleFileChoose}
      >
        드래그 앤 드랍 또는 클릭하여 파일을 추가하세요.
        <input
          hidden
          ref={inputRef}
          type="file"
          multiple
          onChange={handleFileInputChange}
        />
      </UploadContainer>
      {previewUrls.map((url) => (
        <Image key={url} src={url} alt="Preview" width={50} height={50} />
      ))}
      <button type="button" onClick={resetImages}>
        초기화
      </button>
      <OrderWrapper>
        <FormControl id="title">
          <FormLabel>title</FormLabel>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="region">
          <FormLabel>region</FormLabel>
          <Input
            type="text"
            name="region"
            value={region}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="hopePrice">
          <FormLabel>hopePrice</FormLabel>
          <Input
            type="text"
            name="hopePrice"
            value={hopePrice}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="visitTime">
          <FormLabel>visitTime</FormLabel>
          <Input
            type="text"
            name="visitTime"
            value={visitTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="cakeCategory">
          <FormLabel>케익 종류</FormLabel>
          <RadioGroup
            name="cakeCategory"
            value={cakeCategory}
            onChange={(value) => handleRadioChange(value, 'cakeCategory')}
          >
            <Stack direction="row">
              {cakeCategories.map((category) => (
                <Radio key={category} value={category}>
                  {convertCakeCategory(category)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="cakeSize">
          <FormLabel>케익 크기</FormLabel>
          <RadioGroup
            name="cakeSize"
            value={cakeSize}
            onChange={(value) => handleRadioChange(value, 'cakeSize')}
          >
            <Stack direction="row">
              {cakeSizes.map((size) => (
                <Radio key={size} value={size}>
                  {convertCakeSize(size)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="cakeHeight">
          <FormLabel>케익 높이</FormLabel>
          <RadioGroup
            name="cakeHeight"
            value={cakeHeight}
            onChange={(value) => handleRadioChange(value, 'cakeHeight')}
          >
            <Stack direction="row">
              {cakeHeights.map((height) => (
                <Radio key={height} value={height}>
                  {convertCakeHeight(height)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="breadFlavor">
          <FormLabel>빵 맛</FormLabel>
          <RadioGroup
            name="breadFlavor"
            value={breadFlavor}
            onChange={(value) => handleRadioChange(value, 'breadFlavor')}
          >
            <Stack direction="row">
              {breadFlavors.map((flavor) => (
                <Radio key={flavor} value={flavor}>
                  {convertBreadFlavor(flavor)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="creamFlavor">
          <FormLabel>크림 맛</FormLabel>
          <RadioGroup
            name="creamFlavor"
            value={creamFlavor}
            onChange={(value) => handleRadioChange(value, 'creamFlavor')}
          >
            <Stack direction="row">
              {creamFlavors.map((flavor) => (
                <Radio key={flavor} value={flavor}>
                  {convertCreamFlavor(flavor)}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>
        <FormControl id="requirements">
          <FormLabel>요청사항</FormLabel>
          <Input
            name="requirements"
            value={requirements}
            onChange={handleChange}
            placeholder="요청사항을 입력하세요."
          />
        </FormControl>
        <Button type="submit">전송하기</Button>
      </OrderWrapper>
    </form>
  );
}

const cakeCategories: CakeCategory[] = [
  'ALL',
  'PHOTO',
  'LETTERING',
  'CHARACTER_IMAGE',
  'CHARACTER_MODEL',
  'ETC',
];
const cakeSizes: CakeSize[] = ['MINI', 'NO_1', 'NO_2', 'ETC'];
const cakeHeights: CakeHeight[] = ['ONE_LAYER', 'TWO_LAYER', 'ETC'];
const breadFlavors: BreadFlavor[] = [
  'VANILLA',
  'CHOCO',
  'GREEN_TEA',
  'CARROT',
  'ETC',
];
const creamFlavors: CreamFlavor[] = [
  'WHIPPED_CREAM',
  'CREAM_CHEESE',
  'CHOCO',
  'OREO',
  'ETC',
];

const OrderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const UploadContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
  border: 1px dashed grey;
  border-radius: 5px;
  cursor: pointer;
`;
