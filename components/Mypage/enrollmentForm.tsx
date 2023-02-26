/* eslint-disable react/jsx-props-no-spreading */
import { FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { SubmitHandler, useForm } from 'react-hook-form';

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
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>사업자 등록 번호</FormLabel>
        <Input required type="text" {...register('businessNumber')} />
      </FormControl>
      <FormControl>
        <FormLabel>대표자 이름</FormLabel>
        <Input required type="text" {...register('ownerName')} />
      </FormControl>
      <FormControl>
        <FormLabel>개업 일자</FormLabel>
        <Input required type="text" {...register('openDate')} />
      </FormControl>
      <FormControl>
        <FormLabel>상호명</FormLabel>
        <Input required type="text" {...register('phoneNumber')} />
      </FormControl>
      <FormControl>
        <FormLabel>주소</FormLabel>
        <AddressDiv>
          <Select required {...register('city')} width={100}>
            <option selected value="">
              시 선택
            </option>
            <option value="seoul">서울시</option>
          </Select>
          <Select required {...register('district')} width={100}>
            <option selected value="">
              구 선택
            </option>
            <option value="seoul">강남구</option>
            <option value="seoul">강동구</option>
            <option value="seoul">강서구</option>
            <option value="seoul">강북구</option>
            <option value="seoul">관악구</option>
            <option value="seoul">광진구</option>
            <option value="seoul">구로구</option>
            <option value="seoul">금천구</option>
            <option value="seoul">노원구</option>
            <option value="seoul">동대문구</option>
            <option value="seoul">도봉구</option>
            <option value="seoul">동작구</option>
            <option value="seoul">마포구</option>
            <option value="seoul">서대문구</option>
            <option value="seoul">성동구</option>
            <option value="seoul">성북구</option>
            <option value="seoul">서초구</option>
            <option value="seoul">송파구</option>
            <option value="seoul">영등포구</option>
            <option value="seoul">용산구</option>
            <option value="seoul">양천구</option>
            <option value="seoul">은평구</option>
            <option value="seoul">종로구</option>
            <option value="seoul">중구</option>
            <option value="seoul">중랑구</option>
          </Select>
        </AddressDiv>

        <Input
          type="text"
          required
          placeholder="상세 주소를 입력해주세요"
          {...register('detailAddress')}
        />
      </FormControl>
      <FormControl>
        <FormLabel>영업 시간</FormLabel>
        <Input
          type="text"
          required
          placeholder="오픈 시간 HH:MM"
          {...register('openTime')}
        />
        <Input
          type="text"
          required
          placeholder="마감 시간 HH:MM"
          {...register('endTime')}
        />
      </FormControl>
      <FormControl>
        <FormLabel>업체 설명</FormLabel>
        <Input type="text" required {...register('description')} />
      </FormControl>
      <FormControl>
        <FormLabel>사업자 등록증 사진</FormLabel>
        <Input type="file" required {...register('businessLicenseImage')} />
      </FormControl>
      <FormControl>
        <FormLabel>업체 대표 사진</FormLabel>
        <Input type="file" required {...register('marketImage')} />
      </FormControl>
      <button type="submit">등록하기</button>
    </Form>
  );
}

const Form = styled.form`
  overflow: scroll;
`;

const AddressDiv = styled.div`
  display: flex;
`;
