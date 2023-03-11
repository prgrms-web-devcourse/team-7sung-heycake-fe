/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GrPowerReset } from 'react-icons/gr';

import ERROR_MESSAGES from '@/constants/errorMessages';
import SEOUL_AREA from '@/constants/seoulArea';
import useClickInput from '@/hooks/useClickInput';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import useImageUpload from '@/hooks/useImageUpload';
import deleteAccessToken from '@/utils/deleteAccessToken';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '../Api';

const {
  CHECK_EMPTY_INPUT,
  CHECK_BUSINESS_NUMBER_LENGTH,
  CHECK_NUMBER_TYPE,
  CHECK_OWNER_NAME_LENGTH,
  CHECK_OWNER_NAME_TYPE,
} = ERROR_MESSAGES;

type InputProps = {
  businessNumber: string;
  ownerName: string;
  openDate: string;
  marketName: string;
  phoneNumber: string;
  city: string;
  district: string;
  detailAddress: string;
  openTime: string;
  endTime: string;
  description: string;
  businessLicenseImage: File;
  marketImage: File;
  memberId: number;
};

export default function EnrollmentForm() {
  const ACCESS_TOKEN = getAccessToken();
  const handleAxiosError = useHandleAxiosError();
  const toast = useToast();
  const {
    files,
    handleDragOver,
    handleDrop,
    handleFileInputChange,
    resetImages,
  } = useImageUpload(1);

  const [inputRef, handleFileChoose] = useClickInput();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputProps>();

  const onSubmit: SubmitHandler<InputProps> = async (data) => {
    const businessLicenseImage: { [key: string]: any } = {
      ...data.businessLicenseImage,
    };
    const marketImage: { [key: string]: any } = {
      ...data.marketImage,
    };
    const formData = new FormData();

    formData.append('businessNumber', data.businessNumber);
    formData.append('ownerName', data.ownerName);
    formData.append('openDate', data.openDate);
    formData.append('marketName', data.marketName);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('city', data.city);
    formData.append('district', data.district);
    formData.append('detailAddress', data.detailAddress);
    formData.append('openTime', data.openTime);
    formData.append('endTime', data.endTime);
    formData.append('description', data.description);
    formData.append('businessLicenseImage', businessLicenseImage[0]);
    formData.append('marketImage', marketImage[0]);
    formData.append('memberId', '4');

    try {
      await publicApi.post('/enrollments', formData, {
        headers: {
          access_token: ACCESS_TOKEN,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast({
        status: 'success',
        description:
          '업체 등록이 성공적으로 신청되었어요. 다시 로그인 해주세요.',
        isClosable: true,
      });
      deleteAccessToken();
      router.push('/');
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <Flex justifyContent="center">
      <form onSubmit={handleSubmit(onSubmit)} id="enrollmentForm">
        <FormControl>
          <FormLabel>업체 이미지 업로드</FormLabel>
          <Flex
            justifyContent="center"
            alignItems="center"
            height="150px"
            maxWidth={340}
            border="1px dashed #E9E9E9"
            borderRadius="5px"
            cursor="poiner"
            margin="0 auto"
            textAlign="center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleFileChoose}
          >
            {files.length !== 0 ? (
              <Container display="flex" flexDir="column" alignItems="center">
                <img
                  src={URL.createObjectURL(files[0])}
                  alt="업체 이미지"
                  {...register('marketImage', {
                    required: '업체 이미지는 필수 입니다.',
                  })}
                />
              </Container>
            ) : (
              <Container
                color="hey.normalGray"
                display="flex"
                flexDir="column"
                alignItems="center"
              >
                <img
                  src="/images/cameraIcon.png"
                  width={30}
                  height={30}
                  alt="카메라 아이콘"
                />
                사진 추가
              </Container>
            )}
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
            margin="0"
            gap="1rem"
          >
            {files.length !== 0 && (
              <Button type="button" onClick={resetImages}>
                <GrPowerReset />
              </Button>
            )}
          </Flex>
          {errors.marketImage && (
            <Box color="red" marginTop={1}>
              {errors.marketImage.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>상호명</FormLabel>
          <Input
            type="text"
            placeholder="상호명을 입력해주세요."
            borderRadius={12}
            {...register('marketName', {
              required: CHECK_EMPTY_INPUT,
            })}
          />
          {errors.marketName && (
            <Box color="red" marginTop={1}>
              {errors.marketName.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>대표자 이름</FormLabel>
          <Input
            type="text"
            placeholder="대표자 이름을 입력해주세요."
            borderRadius={12}
            {...register('ownerName', {
              required: CHECK_EMPTY_INPUT,
              minLength: 2,
              maxLength: {
                value: 20,
                message: CHECK_OWNER_NAME_LENGTH,
              },
              pattern: {
                value: /[ㄱ-ㅎ|가-힣|a-z|A-Z]/,
                message: CHECK_OWNER_NAME_TYPE,
              },
            })}
          />
          {errors.ownerName && (
            <Box color="red" marginTop={1}>
              {errors.ownerName.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>개업 일자</FormLabel>
          <Input
            type="date"
            borderRadius={12}
            {...register('openDate', { required: CHECK_EMPTY_INPUT })}
          />
          {errors.openDate && (
            <Box color="red" marginTop={1}>
              {errors.openDate.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>업체 전화번호</FormLabel>
          <Input
            type="text"
            placeholder="업체 전화번호를 입력해주세요."
            borderRadius={12}
            {...register('phoneNumber', {
              required: CHECK_EMPTY_INPUT,
              pattern: {
                value: /^[0-9+]*$/,
                message: CHECK_NUMBER_TYPE,
              },
            })}
          />
          {errors.phoneNumber && (
            <Box color="red" marginTop={1}>
              {errors.phoneNumber.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={162} width={350}>
          <FormLabel>주소</FormLabel>
          <Container display="flex" padding={0}>
            <Select
              {...register('city', { required: CHECK_EMPTY_INPUT })}
              width={170}
              marginRight={2}
              marginBottom={2}
              defaultValue=""
              borderRadius={12}
            >
              <option value="" color="hey.normalGray">
                시 선택
              </option>
              <option value="서울시">서울시</option>
            </Select>
            <Select
              {...register('district', { required: CHECK_EMPTY_INPUT })}
              width={170}
              defaultValue=""
              borderRadius={12}
            >
              <option value="">구 선택</option>
              {SEOUL_AREA.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </Select>
          </Container>
          <Container padding={0}>
            <Input
              type="text"
              placeholder="상세 주소를 입력해주세요."
              borderRadius={12}
              {...register('detailAddress', { required: CHECK_EMPTY_INPUT })}
            />
          </Container>
          {(errors.city && (
            <Box color="red" marginTop={1}>
              {errors.city.message}
            </Box>
          )) ||
            (errors.district && (
              <Box color="red" marginTop={1}>
                {errors.district.message}
              </Box>
            )) ||
            (errors.detailAddress && (
              <Box color="red" marginTop={1}>
                {errors.detailAddress.message}
              </Box>
            ))}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>사업자 등록 번호</FormLabel>
          <Input
            type="text"
            placeholder="사업자 등록 번호를 입력해주세요."
            borderRadius={12}
            {...register('businessNumber', {
              required: CHECK_EMPTY_INPUT,
              pattern: {
                value: /^[0-9+]*$/,
                message: CHECK_NUMBER_TYPE,
              },
              minLength: 10,
              maxLength: {
                value: 10,
                message: CHECK_BUSINESS_NUMBER_LENGTH,
              },
            })}
          />
          {errors.businessNumber && (
            <Box color="red" marginTop={1}>
              {errors.businessNumber.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>사업자 등록 사진</FormLabel>
          <Input
            type="file"
            {...register('businessLicenseImage', {
              required: CHECK_EMPTY_INPUT,
            })}
            padding={1}
          />
          {errors.businessLicenseImage && (
            <Box color="red" marginTop={1}>
              {errors.businessLicenseImage.message}
            </Box>
          )}
        </FormControl>
        <FormControl height={110} width={350}>
          <FormLabel>영업 시간</FormLabel>
          <Input
            type="time"
            borderRadius={12}
            {...register('openTime', { required: CHECK_EMPTY_INPUT })}
            width={170}
            marginRight={2}
          />
          <Input
            type="time"
            borderRadius={12}
            {...register('endTime', { required: CHECK_EMPTY_INPUT })}
            width={170}
          />
          {(errors.openTime && (
            <Box color="red" marginTop={1}>
              {errors.openTime.message}
            </Box>
          )) ||
            (errors.endTime && (
              <Box color="red" marginTop={1}>
                {errors.endTime.message}
              </Box>
            ))}
        </FormControl>
        <FormControl>
          <FormLabel>업체 설명</FormLabel>
          <Textarea
            placeholder="업체 설명을 입력해주세요."
            borderRadius={12}
            {...register('description', { required: CHECK_EMPTY_INPUT })}
          />
          {errors.description && (
            <Box color="red" marginTop={1}>
              {errors.description.message}
            </Box>
          )}
        </FormControl>
        <Button
          type="submit"
          width={350}
          height={14}
          backgroundColor="hey.main"
          color="white"
          borderRadius={10}
          fontSize={16}
          fontWeight="medium"
          marginTop={16}
        >
          등록
        </Button>
      </form>
    </Flex>
  );
}
