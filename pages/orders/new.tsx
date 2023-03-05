import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';

import { publicApi } from '@/components/Api';
import LocationSelectBox from '@/components/Main/location/locationSelectBox';
import CakeSelect from '@/components/Orders/CakeSelect';
import {
  breadFlavors,
  cakeCategories,
  cakeHeights,
  cakeSizes,
  creamFlavors,
} from '@/constants/cakeFormat';
import ERROR_MESSAGES from '@/constants/errorMessages';
import useClickInput from '@/hooks/useClickInput';
import useImageUpload from '@/hooks/useImageUpload';
import {
  BreadFlavor,
  CakeCategory,
  CakeForm,
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

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const initialFormData: CakeForm = {
  title: '',
  hopePrice: '',
  cakeCategory: 'ALL',
  cakeSize: 'MINI',
  cakeHeight: 'ONE_LAYER',
  breadFlavor: 'VANILLA',
  creamFlavor: 'WHIPPED_CREAM',
  requirements: '',
};

export default function NewOrder() {
  const [location, setLocation] = useState('강남구');
  const [visitTime, setVisitTime] = useState('');
  const [formData, setFormData] = useState<CakeForm>(initialFormData);
  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  } = useImageUpload();
  const [inputRef, handleFileChoose] = useClickInput();
  const [date, setDate] = useState(new Date());

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    setVisitTime(inputTime);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!timeRegex.test(visitTime)) {
      return;
    }

    const newFormData = new FormData();
    newFormData.append('title', formData.title);
    newFormData.append('hopePrice', formData.hopePrice);
    newFormData.append('region', location);
    newFormData.append(
      'visitTime',
      `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${visitTime}:00`
    );
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
          access_token:
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaXNzIjoiaGV5LWNha2UiLCJleHAiOjM2NzgwMjc4MzMsImlhdCI6MTY3ODAyNzgzMywibWVtYmVySWQiOjJ9.YRCRVDbszmdco_1AFVY_drpwcQ9f30zZKirDxoX-JCSFCEI7Lx-T-hQG98Ipyquu-VOM2CXaSY5V6urtwqMnHw',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const localLocation = window.localStorage.getItem('location');
    if (localLocation) {
      setLocation(localLocation);
    }
  }, []);

  const {
    title,
    hopePrice,
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
          <LocationSelectBox location={location} setLocation={setLocation} />
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
            isInvalid={!timeRegex.test(visitTime)}
            type="text"
            name="visitTime"
            value={visitTime}
            onChange={handleTimeChange}
          />
          {!timeRegex.test(visitTime) && (
            <ValidityMessage>{ERROR_MESSAGES.CHECK_INPUT_TIME}</ValidityMessage>
          )}
        </FormControl>
        <CakeSelect<CakeCategory>
          id="cakeCategory"
          label="케익 종류"
          value={cakeCategory}
          options={cakeCategories}
          onChange={handleChange}
          convertOption={convertCakeCategory}
        />
        <CakeSelect<CakeSize>
          id="cakeSize"
          label="케익 크기"
          value={cakeSize}
          options={cakeSizes}
          onChange={handleChange}
          convertOption={convertCakeSize}
        />
        <CakeSelect<CakeHeight>
          id="cakeHeight"
          label="케익 높이"
          value={cakeHeight}
          options={cakeHeights}
          onChange={handleChange}
          convertOption={convertCakeHeight}
        />
        <CakeSelect<BreadFlavor>
          id="breadFlavor"
          label="빵 종류"
          value={breadFlavor}
          options={breadFlavors}
          onChange={handleChange}
          convertOption={convertBreadFlavor}
        />
        <CakeSelect<CreamFlavor>
          id="creamFlavor"
          label="크림 맛"
          value={creamFlavor}
          options={creamFlavors}
          onChange={handleChange}
          convertOption={convertCreamFlavor}
        />
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

const ValidityMessage = styled.span`
  color: red;
`;
