import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

type ErrorMessage = { message?: string };

const useHandleAxiosError = () => {
  const toast = useToast();

  const handleAxiosError = (axiosError: unknown) => {
    if (!isAxiosError(axiosError)) return;

    const { data } = axiosError.response ?? {};
    const messageData = data?.message;

    toast({
      description: messageData || '잠시 후 다시 시도해주세요.',
      status: 'error',
      isClosable: true,
    });
  };

  const isAxiosError = (error: unknown): error is AxiosError<ErrorMessage> =>
    (error as AxiosError<ErrorMessage>).response !== undefined;

  return handleAxiosError;
};

export default useHandleAxiosError;
