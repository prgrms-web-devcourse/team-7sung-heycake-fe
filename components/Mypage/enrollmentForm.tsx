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

const { CHECK_BUSINESS_NUMBER, CHECK_OWNER_NAME } = ERROR_MESSAGES;

type Inputs = {
  businessNumber: string;
  ownerName: string;
  openDate: string;
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
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            <option value="강남구">강남구</option>
            <option value="강동구">강동구</option>
            <option value="강서구">강서구</option>
            <option value="강북구">강북구</option>
            <option value="관악구">관악구</option>
            <option value="광진구">광진구</option>
            <option value="구로구">구로구</option>
            <option value="금천구">금천구</option>
            <option value="노원구">노원구</option>
            <option value="동대문구">동대문구</option>
            <option value="도봉구">도봉구</option>
            <option value="동작구">동작구</option>
            <option value="마포구">마포구</option>
            <option value="서대문구">서대문구</option>
            <option value="성동구">성동구</option>
            <option value="성북구">성북구</option>
            <option value="서초구">서초구</option>
            <option value="송파구">송파구</option>
            <option value="영등포구">영등포구</option>
            <option value="용산구">용산구</option>
            <option value="양천구">양천구</option>
            <option value="은평구">은평구</option>
            <option value="종로구">종로구</option>
            <option value="중구">중구</option>
            <option value="중랑구">중랑구</option>
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
