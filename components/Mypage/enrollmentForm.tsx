import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import ERROR_MESSAGES from '@/constants/errorMessages';
import SEOUL_AREA from '@/constants/seoulArea';
import useHandleAxiosError from '@/hooks/useHandleAxiosError';
import deleteAccessToken from '@/utils/deleteAccessToken';
import { getAccessToken } from '@/utils/getAccessToken';

import { publicApi } from '../Api';

const {
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
    <form onSubmit={handleSubmit(onSubmit)} id="enrollmentForm">
      <FormControl height={100} width={350}>
        <FormLabel>사업자 등록 번호</FormLabel>
        <Input
          type="text"
          placeholder="10자리 숫자만 입력해주세요."
          {...register('businessNumber', {
            required: true,
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
          <Text fontSize="8px" color="red">
            {errors.businessNumber.message}
          </Text>
        )}
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>대표자 이름</FormLabel>
        <Input
          type="text"
          {...register('ownerName', {
            required: true,
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
          <Text fontSize="8px" color="red">
            {errors.ownerName.message}
          </Text>
        )}
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>개업 일자</FormLabel>
        <Input type="date" {...register('openDate', { required: true })} />
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>상호명</FormLabel>
        <Input type="text" {...register('marketName', { required: true })} />
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>업체 전화번호</FormLabel>
        <Input
          type="text"
          placeholder="숫자만 입력해주세요."
          {...register('phoneNumber', {
            required: true,
            pattern: {
              value: /^[0-9+]*$/,
              message: CHECK_NUMBER_TYPE,
            },
          })}
        />
        {errors.phoneNumber && (
          <Text fontSize="8px" color="red">
            {errors.phoneNumber.message}
          </Text>
        )}
      </FormControl>
      <FormControl height={150} width={350}>
        <FormLabel>주소</FormLabel>
        <Container display="flex" padding={0}>
          <Select
            {...register('city', { required: true })}
            width={170}
            marginRight={2}
            marginBottom={2}
            defaultValue=""
          >
            <option value="">시 선택</option>
            <option value="서울시">서울시</option>
          </Select>
          <Select
            defaultValue=""
            {...register('district', { required: true })}
            width={170}
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
            placeholder="상세 주소를 입력해주세요"
            {...register('detailAddress', { required: true })}
          />
        </Container>
      </FormControl>
      <FormControl width={350} height={100}>
        <FormLabel>영업 시간</FormLabel>
        <Input
          type="time"
          {...register('openTime', { required: true })}
          width={170}
          marginRight={2}
        />

        <Input
          type="time"
          {...register('endTime', { required: true })}
          width={170}
        />
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>업체 설명</FormLabel>
        <Input type="text" {...register('description', { required: true })} />
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>사업자 등록증 사진</FormLabel>
        <Input
          type="file"
          {...register('businessLicenseImage', { required: true })}
          padding={1}
        />
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>업체 대표 사진</FormLabel>
        <Input
          type="file"
          {...register('marketImage', { required: true })}
          padding={1}
        />
      </FormControl>
      <Button
        type="submit"
        width={350}
        padding={1}
        bg="hey.lightOrange"
        fontSize="1.3rem"
        marginBottom={10}
        _hover={{ bg: 'hey.sub' }}
      >
        등록하기
      </Button>
    </form>
  );
}
