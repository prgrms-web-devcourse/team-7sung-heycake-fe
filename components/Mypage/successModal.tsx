import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction } from 'react';

import deleteAccessToken from '@/utils/deleteAccessToken';

interface SuccessInfo {
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
  marketName: string;
  ownerName: string;
  address: string;
}

export default function SuccessModal({ ...props }: SuccessInfo) {
  const router = useRouter();
  const toast = useToast();

  function handleSuccess() {
    const toastId = 'success';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        status: 'success',
        description:
          '업체 등록이 성공적으로 신청되었어요. 다시 로그인 해주세요.',
        duration: 1000,
        isClosable: true,
        containerStyle: {
          marginBottom: '60px',
        },
      });
    }
    deleteAccessToken();
    router.push('/');
  }

  return (
    <Modal
      isOpen={props.success}
      onClose={() => props.setSuccess(false)}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent width={400} height={600} borderRadius="14px">
        <ModalHeader marginTop={8}>
          <Text fontSize={30} fontWeight="medium">
            업체 등록이
          </Text>
          <Text fontSize={30} color="hey.main" fontWeight="medium">
            완료되었습니다.
          </Text>
        </ModalHeader>
        <ModalBody marginTop={10}>
          <Container>
            <Text fontWeight="bold" fontSize={18}>
              상호명
            </Text>
            <Text>{props.marketName}</Text>
          </Container>
          <Container>
            <Text fontWeight="bold" fontSize={18}>
              대표자 이름
            </Text>
            <Text>{props.ownerName}</Text>
          </Container>
          <Container>
            <Text fontWeight="bold" fontSize={18}>
              주소
            </Text>
            <Text>{props.address}</Text>
          </Container>
        </ModalBody>

        <Container marginBottom={8} display="flex" justifyContent="center">
          <ModalFooter>
            <Button
              colorScheme="blue"
              width="10rem"
              height="3rem"
              mr={3}
              borderRadius="12px"
              onClick={() => {
                props.setSuccess(true);
                handleSuccess();
              }}
            >
              맞습니다
            </Button>
          </ModalFooter>
        </Container>
      </ModalContent>
    </Modal>
  );
}
