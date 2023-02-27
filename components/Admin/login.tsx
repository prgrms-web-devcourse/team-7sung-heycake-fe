import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  Input,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';

export default function AdminLogin() {
  const [inputId, setInputId] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const onSubmitHandler = (e: FormEvent) => {
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
          <FormControl>
            <FormLabel>Id</FormLabel>
            <Input
              placeholder="Id"
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="heys">
            확인
          </Button>
        </Grid>
      </form>
    </Container>
  );
}
