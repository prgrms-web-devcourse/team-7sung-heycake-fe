import { Alert, AlertIcon } from '@chakra-ui/react';

export default function ApiErrorAlert({ error }: any) {
  return (
    <Alert status="error">
      <AlertIcon />
      {error}
    </Alert>
  );
}
