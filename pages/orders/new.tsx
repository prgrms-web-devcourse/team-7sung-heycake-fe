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
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { publicApi } from '@/components/Api';
import LocationSelectBox from '@/components/Main/location/locationSelectBox';
import CakeSelect from '@/components/Orders/CakeSelect';
import RemoveImageButton from '@/components/Orders/RemoveImageButton';
import HeaderTitle from '@/components/Shared/headerTitle';
import {
  breadFlavors,
  cakeCategories,
  cakeHeights,
  cakeSizes,
  creamFlavors,
} from '@/constants/cakeFormat';
import ERROR_MESSAGES from '@/constants/errorMessages';
import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import {
  BreadFlavor,
  CakeCategory,
  CakeForm,
  CakeHeight,
  CakeSize,
  CreamFlavor,
} from '@/types/orders';
import { getAccessToken } from '@/utils/getAccessToken';
import {
  convertBreadFlavor,
  convertCakeCategory,
  convertCakeHeight,
  convertCakeSize,
  convertCreamFlavor,
} from '@/utils/orders';

export default function NewOrder() {
  const [location, setLocation] = useState('강남구');
  const [visitTime, setVisitTime] = useState('');
  const [hopePrice, setHopePrice] = useState(30000);
  const [directInput, setDirectInput] = useState(false);
  const [formData, setFormData] = useState<CakeForm>(initialFormData);
  const {
    previewUrls,
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    handleDeleteImage,
  } = useImageUpload();
  const [inputRef, handleFileChoose] = useClickInput();
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  const requirementRef = useRef<HTMLTextAreaElement>(null);
  const accessToken = getAccessToken();
  const toast = useToast();
  const handleAxiosError = useHandleAxiosError();

  const handleSliderChange = (price: number) => {
    setHopePrice(price);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDirectInput(e.target.checked);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    setVisitTime(inputTime);
  };

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

    if (formData.title === '' || requirementRef.current === null) {
      toast({
        status: 'error',
        description: '입력한 값을 확인해 주세요',
        isClosable: true,
      });
      return;
    }

    if (hopePrice < 10000) {
      toast({
        status: 'error',
        description: '최소 금액은 10,000원 이상이에요',
        isClosable: true,
      });
      return;
    }

    if (!timeRegex.test(visitTime)) {
      toast({
        status: 'error',
        description: '시간을 예시에 맞춰서 입력해 주세요',
        isClosable: true,
      });
      return;
    }

    const formDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')} ${visitTime}:00`;
    const newFormData = new FormData();
    newFormData.append('title', formData.title);
    newFormData.append('hopePrice', hopePrice.toString());
    newFormData.append('region', location);
    newFormData.append('visitTime', formDate);
    newFormData.append('cakeCategory', formData.cakeCategory);
    newFormData.append('cakeSize', formData.cakeSize);
    newFormData.append('cakeHeight', formData.cakeHeight);
    newFormData.append('breadFlavor', formData.breadFlavor);
    newFormData.append('creamFlavor', formData.creamFlavor);
    newFormData.append('requirements', requirementRef.current.value);

    files.forEach((file) => {
      newFormData.append(`cakeImages`, file);
    });

    try {
      await publicApi.post('/orders', newFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          access_token: accessToken,
        },
      });
      router.push('/main');
      toast({
        status: 'success',
        description: '주문이 성공적으로 등록되었어요.',
        isClosable: true,
      });
    } catch (error) {
      handleAxiosError(error);
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

  return (
    <form style={{ paddingBottom: '2rem' }} onSubmit={handleSubmit}>
      <HeaderTitle title="주문표 작성" />
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
              /3
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
              <Box position="relative" display="inline-block">
                <Button
                  width="70px"
                  height="70px"
                  onClick={() => handleDeleteImage(urlIndex)}
                  borderRadius="1rem"
                  padding="0"
                  bg="white"
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
      <Flex flexDirection="column" width="100%" gap="1.4rem">
        <FormControl id="title">
          <FormLabel>제목</FormLabel>
          <Input
            borderRadius="1rem"
            height="3rem"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
          />
        </FormControl>
        <FormControl id="region">
          <FormLabel>지역</FormLabel>
          <LocationSelectBox location={location} setLocation={setLocation} />
        </FormControl>
        <FormControl
          display="flex"
          flexDirection="column"
          gap="1rem"
          id="hopePrice"
        >
          <FormLabel>희망가격</FormLabel>
          <Slider
            min={10000}
            max={100000}
            step={5000}
            defaultValue={hopePrice}
            value={directInput ? undefined : hopePrice}
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
            name="hopePrice"
            value={hopePrice}
            onChange={(e) => setHopePrice(+e.target.value)}
            placeholder="희망가격을 입력하세요."
          />
          <Checkbox isChecked={directInput} onChange={handleCheckboxChange}>
            직접 입력
          </Checkbox>
        </FormControl>
        <FormControl id="visitTime">
          <FormLabel>방문 예정 시간</FormLabel>
          <SingleDatepicker
            propsConfigs={{
              inputProps: {
                borderRadius: '1rem',
                height: '3rem',
              },
            }}
            name="date-input"
            date={date}
            onDateChange={setDate}
          />
          <Input
            marginTop="1rem"
            borderRadius="1rem"
            height="3rem"
            isInvalid={visitTime !== '' && !timeRegex.test(visitTime)}
            type="text"
            name="visitTime"
            value={visitTime}
            onChange={handleTimeChange}
            placeholder="방문시간을 입력하세요."
          />
          {visitTime !== '' && !timeRegex.test(visitTime) && (
            <Box color="red">{ERROR_MESSAGES.CHECK_INPUT_TIME}</Box>
          )}
        </FormControl>
        <CakeSelect<CakeCategory>
          id="cakeCategory"
          label="케이크 종류"
          value={formData.cakeCategory}
          options={cakeCategories}
          onChange={handleChange}
          convertOption={convertCakeCategory}
        />
        <CakeSelect<CakeSize>
          id="cakeSize"
          label="케이크 크기"
          value={formData.cakeSize}
          options={cakeSizes}
          onChange={handleChange}
          convertOption={convertCakeSize}
        />
        <CakeSelect<CakeHeight>
          id="cakeHeight"
          label="케이크 높이"
          value={formData.cakeHeight}
          options={cakeHeights}
          onChange={handleChange}
          convertOption={convertCakeHeight}
        />
        <CakeSelect<BreadFlavor>
          id="breadFlavor"
          label="빵 종류"
          value={formData.breadFlavor}
          options={breadFlavors}
          onChange={handleChange}
          convertOption={convertBreadFlavor}
        />
        <CakeSelect<CreamFlavor>
          id="creamFlavor"
          label="크림 맛"
          value={formData.creamFlavor}
          options={creamFlavors}
          onChange={handleChange}
          convertOption={convertCreamFlavor}
        />
        <FormControl paddingBottom="2rem" id="requirements">
          <FormLabel>요청사항</FormLabel>
          <Textarea
            borderRadius="1rem"
            padding="1rem"
            minH="182px"
            name="requirements"
            ref={requirementRef}
            placeholder="요청사항을 입력하세요. 예) 과일 알레르기가 있어 과일을 빼주세요."
          />
        </FormControl>
        <Button
          color="white"
          background="hey.main"
          height="3.75rem"
          borderRadius="1rem"
          type="submit"
        >
          등록
        </Button>
      </Flex>
    </form>
  );
}

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const initialFormData: CakeForm = {
  title: '',
  cakeCategory: 'PHOTO',
  cakeSize: 'MINI',
  cakeHeight: 'ONE_LAYER',
  breadFlavor: 'VANILLA',
  creamFlavor: 'WHIPPED_CREAM',
};
