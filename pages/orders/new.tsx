import { Button, Input } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { publicApi } from '@/components/Api';

export default function NewOrder() {
  const [formData, setFormData] = useState({
    title: '',
    hopePrice: '',
    region: '',
    visitTime: '',
    cakeCategory: '',
    cakeSize: '',
    cakeHeight: '',
    breadFlavor: '',
    creamFlavor: '',
    requirements: '',
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      setImageFiles(Array.from(files));
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

    imageFiles.forEach((file) => {
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
      <input type="file" id="image" name="image" onChange={handleImageChange} />
      <OrderWrapper>
        <div>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            placeholder="title"
            onChange={handleChange}
          />
          <Input
            type="text"
            id="region"
            name="region"
            value={region}
            placeholder="region"
            onChange={handleChange}
          />
        </div>
        <Input
          type="text"
          id="hopePrice"
          name="hopePrice"
          value={hopePrice}
          placeholder="hopePrice"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="visitTime"
          name="visitTime"
          value={visitTime}
          placeholder="visitTime"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="breadFlavor"
          name="breadFlavor"
          value={breadFlavor}
          placeholder="케익 맛"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="cakeCategory"
          name="cakeCategory"
          value={cakeCategory}
          placeholder="cakeCategory"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="cakeHeight"
          name="cakeHeight"
          value={cakeHeight}
          placeholder="cakeHeight"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="cakeSize"
          name="cakeSize"
          value={cakeSize}
          placeholder="cakeSize"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="creamFlavor"
          name="creamFlavor"
          value={creamFlavor}
          placeholder="creamFlavor"
          onChange={handleChange}
        />
        <Input
          type="text"
          id="requirements"
          name="requirements"
          value={requirements}
          placeholder="requirements"
          onChange={handleChange}
        />
        <Button type="submit">전송하기</Button>
      </OrderWrapper>
    </form>
  );
}

const OrderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;
