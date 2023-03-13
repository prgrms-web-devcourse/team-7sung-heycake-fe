import { useToast } from '@chakra-ui/react';
import { AxiosError } from 'axios';

type ErrorMessage = { message?: string };

const useHandleAxiosError = () => {
  const toast = useToast();

  const handleAxiosError = (axiosError: unknown) => {
    if (!isAxiosError(axiosError)) return;

    const { response } = axiosError as AxiosError<ErrorMessage>;

    if (response?.status === 400) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '잘못된 요청입니다. 입력값을 확인해주세요.',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else if (response?.status === 401) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '인증이 필요한 서비스에요',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else if (response?.status === 404) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '올바른 접근이 아니에요',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else if (response?.status === 403) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '권한이 없어요',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else if (response?.status === 409) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '이미 완료된 주문이에요',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else if (response?.status === 500) {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '서버에서 에러가 발생했어요. 잠시 후 다시 시도해주세요.',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    } else {
      const toastId = 'error';
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          description: '잠시 후 다시 시도해주세요.',
          status: 'error',
          duration: 1000,
          containerStyle: {
            marginBottom: '60px',
          },
        });
      }
    }
  };

  const isAxiosError = (error: unknown): error is AxiosError<ErrorMessage> =>
    (error as AxiosError<ErrorMessage>).response !== undefined;

  return handleAxiosError;
};

export default useHandleAxiosError;
