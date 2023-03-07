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
} from '@chakra-ui/react';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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
    resetImages,
  } = useImageUpload();
  const [inputRef, handleFileChoose] = useClickInput();
  const [date, setDate] = useState(new Date());
  const router = useRouter();
  const requirementRef = useRef<HTMLTextAreaElement>(null);
  const accessToken = getAccessToken();

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = event.target.value;
    setVisitTime(inputTime);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (accessToken === null) {
      alert('로그인을 해주세요');
      return;
    }

    if (formData.title === '' || requirementRef.current === null) {
      alert('입력한 값을 확인해 주세요');
      return;
    }

    if (hopePrice < 10000) {
      alert('최소 금액은 10,000원 이상이에요');
      return;
    }

    if (!timeRegex.test(visitTime)) {
      alert('시간을 예시에 맞춰서 입력해 주세요');
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
      alert('주문이 성공적으로 등록되었어요.');
      router.push('/main');
    } catch (error) {
      alert('주문 등록을 실패했어요. 다시 한번 확인해 주세요.');
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
    cakeCategory,
    cakeSize,
    cakeHeight,
    breadFlavor,
    creamFlavor,
  } = formData;

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
        <br />({files.length}/3)
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
      <Flex flexDirection="column" width="100%" gap="1rem">
        <FormControl id="title">
          <FormLabel>제목</FormLabel>
          <Input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            placeholder="제목을 입력하세요."
          />
        </FormControl>
        <FormControl id="region">
          <FormLabel>지역</FormLabel>
          <LocationSelectBox location={location} setLocation={setLocation} />
        </FormControl>
        <FormControl id="hopePrice">
          <FormLabel display="flex" justifyContent="space-between">
            희망가격
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
            value={hopePrice}
            onChange={setHopePrice}
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
            name="hopePrice"
            value={hopePrice !== 0 ? hopePrice : ''}
            onChange={(e) => setHopePrice(+e.target.value)}
            placeholder="희망가격을 입력하세요."
            min={10000}
            max={100000}
            step={5000}
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
          <Textarea
            minH="100px"
            name="requirements"
            ref={requirementRef}
            placeholder="요청사항을 입력하세요."
          />
        </FormControl>
        <Button background="hey.sub" type="submit">
          전송하기
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
