import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';

export default function AdminLogin() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const isErrorId = inputId === '';
  const isErrorPassword = inputPassword === '';

  const onSubmitHandler = (e) => {
    e.preventDefault();
    // Api와 연동하여 아이디 비밀번호 확인
    /* console.log(e);
    console.log(inputId);
    console.log(inputPassword); */
  };

  return (
    <Container pt={4}>
      <form onSubmit={onSubmitHandler}>
        <Grid gap={6}>
          <FormControl isRequired isInvalid={isErrorId}>
            <FormLabel>Id</FormLabel>
            <Input
              placeholder="Id"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
            {!isErrorId ? (
              <FormHelperText>운영자 Id를 입력해주세요</FormHelperText>
            ) : (
              <FormErrorMessage>Id 가 필요합니다</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isRequired isInvalid={isErrorPassword}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
            {!isErrorPassword ? (
              <FormHelperText>운영자 비밀번호를 입력해주세요</FormHelperText>
            ) : (
              <FormErrorMessage>Password 가 필요합니다</FormErrorMessage>
            )}
          </FormControl>
          <Button type="submit" colorScheme="heys">
            확인
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
