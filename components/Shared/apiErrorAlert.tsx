import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';

export default function ApiErrorAlert() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(onOpen, [onOpen]);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />
      <AlertDialogContent m={4}>
        <AlertDialogHeader>페이지에 에러가 발생했습니다</AlertDialogHeader>
        <AlertDialogBody>관리자에게 문의해주세요</AlertDialogBody>
        <AlertDialogFooter>
          <Button
            colorScheme="green"
            color="white"
            onClick={() => router.reload()}
          >
            새로고침
          </Button>
          <Button
            colorScheme="orange"
            color="white"
            onClick={() => router.replace('/')}
            ml={3}
          >
            메인페이지로 이동
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
