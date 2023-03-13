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
import { useState } from 'react';

import deleteAccessToken from '@/utils/deleteAccessToken';

interface SuccessInfo {
  success: boolean;
  marketName: string;
  ownerName: string;
  address: string;
}

export default function SuccessModal({ ...props }: SuccessInfo) {
  const router = useRouter();
  const toast = useToast();
  const [open, setOpen] = useState(props.success);

  function handleSuccess() {
    toast({
      status: 'success',
      description: '업체 등록이 성공적으로 신청되었어요. 다시 로그인 해주세요.',
      isClosable: true,
    });
    deleteAccessToken();
    router.push('/');
  }
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} closeOnOverlayClick>
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
              variant="ghost"
              onClick={() => setOpen(false)}
              border="1px"
              borderRadius="12px"
              width="10rem"
              height="3rem"
              borderColor="hey.lightGray"
              marginRight={4}
            >
              정보 수정
            </Button>
            <Button
              colorScheme="blue"
              width="10rem"
              height="3rem"
              mr={3}
              borderRadius="12px"
              onClick={() => handleSuccess()}
            >
              맞습니다
            </Button>
          </ModalFooter>
        </Container>
      </ModalContent>
    </Modal>
  );
}
