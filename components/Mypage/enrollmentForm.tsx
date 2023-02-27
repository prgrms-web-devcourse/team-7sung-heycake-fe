/* eslint-disable react/jsx-props-no-spreading */
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';

import ERROR_MESSAGES from '@/constants/errorMessages';
import SEOUL_AREA from '@/constants/seoulArea';

const { CHECK_BUSINESS_NUMBER, CHECK_OWNER_NAME } = ERROR_MESSAGES;

type inputProps = {
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
};

export default function EnrollmentForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<inputProps>();
  const onSubmit: SubmitHandler<inputProps> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl height={100} width={350}>
        <FormLabel>사업자 등록 번호</FormLabel>
        <Input
          type="text"
          {...register('businessNumber', {
            required: true,
            minLength: 10,
            maxLength: 10,
          })}
        />
        {errors.businessNumber && (
          <ErrorSpan>{CHECK_BUSINESS_NUMBER}</ErrorSpan>
        )}
      </FormControl>
      <FormControl height={100} width={350}>
        <FormLabel>대표자 이름</FormLabel>
        <Input
          type="text"
          {...register('ownerName', {
            required: true,
            minLength: 2,
            maxLength: 20,
          })}
        />
        {errors.ownerName && <ErrorSpan>{CHECK_OWNER_NAME}</ErrorSpan>}
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
        <Input type="text" {...register('phoneNumber', { required: true })} />
      </FormControl>
      <FormControl height={150} width={350}>
        <FormLabel>주소</FormLabel>
        <AddressDiv>
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
        </AddressDiv>

        <Input
          type="text"
          placeholder="상세 주소를 입력해주세요"
          {...register('detailAddress', { required: true })}
        />
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
    </Form>
  );
}

const Form = styled.form`
  overflow: scroll;
`;

const AddressDiv = styled.div`
  display: flex;
`;

const ErrorSpan = styled.span`
  color: red;
  font-size: 8px;
`;
