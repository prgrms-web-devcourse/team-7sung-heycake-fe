import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';

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
  const [date, setDate] = useState(new Date());

  const handleFileChoose = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  console.log(date.toISOString());

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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
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
    <Form onSubmit={handleSubmit}>
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
      <ImageBox>
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
      </ImageBox>

      <OrderWrapper>
        <FormControl id="title">
          <FormLabel>제목</FormLabel>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="region">
          <FormLabel>지역</FormLabel>
          <Input
            type="text"
            name="region"
            value={region}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="hopePrice">
          <FormLabel>희망가격</FormLabel>
          <Input
            type="text"
            name="hopePrice"
            value={hopePrice}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="visitTime">
          <FormLabel>방문시간</FormLabel>
          <SingleDatepicker
            name="date-input"
            date={date}
            onDateChange={setDate}
          />
          <Input
            type="text"
            name="visitTime"
            value={visitTime}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="cakeCategory">
          <FormLabel>케익 종류</FormLabel>
          <Select
            name="cakeCategory"
            value={cakeCategory}
            onChange={handleSelectChange}
          >
            {cakeCategories.map((category) => (
              <option key={category} value={category}>
                {convertCakeCategory(category)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="cakeSize">
          <FormLabel>케익 크기</FormLabel>
          <Select
            name="cakeSize"
            value={cakeSize}
            onChange={handleSelectChange}
          >
            {cakeSizes.map((size) => (
              <option key={size} value={size}>
                {convertCakeSize(size)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="cakeHeight">
          <FormLabel>케익 높이</FormLabel>
          <Select
            name="cakeHeight"
            value={cakeHeight}
            onChange={handleSelectChange}
          >
            {cakeHeights.map((height) => (
              <option key={height} value={height}>
                {convertCakeHeight(height)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="breadFlavor">
          <FormLabel>빵 맛</FormLabel>
          <Select
            name="breadFlavor"
            value={breadFlavor}
            onChange={handleSelectChange}
          >
            {breadFlavors.map((flavor) => (
              <option key={flavor} value={flavor}>
                {convertBreadFlavor(flavor)}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl id="creamFlavor">
          <FormLabel>크림 맛</FormLabel>
          <Select
            name="creamFlavor"
            value={creamFlavor}
            onChange={handleSelectChange}
          >
            {creamFlavors.map((flavor) => (
              <option key={flavor} value={flavor}>
                {convertCreamFlavor(flavor)}
              </option>
            ))}
          </Select>
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
    </Form>
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
`;

const UploadContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  border: 1px dashed grey;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 auto;
`;

const Form = styled.form`
  max-width: 650px;
  margin: 0 auto;
  padding: 1rem;
`;

const ImageBox = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  height: 70px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 1rem;
`;
