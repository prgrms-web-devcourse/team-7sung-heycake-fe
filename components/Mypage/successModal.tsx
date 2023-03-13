import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

export default function SuccessModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent width={400} height={600} borderRadius="14px">
          <ModalHeader marginTop={10}>
            <Text fontSize={28}>업체 등록이</Text>
            <Text fontSize={28} color="hey.main">
              완료되었습니다.
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody marginTop={10}>
            <Container>
              <Text fontWeight="bold" fontSize={18}>
                상호명
              </Text>
            </Container>
            <Container>
              <Text fontWeight="bold" fontSize={18}>
                대표자 이름
              </Text>
            </Container>
            <Container>
              <Text fontWeight="bold" fontSize={18}>
                주소
              </Text>
            </Container>
          </ModalBody>

          <Container marginBottom={8} display="flex" justifyContent="center">
            <Button
              variant="ghost"
              onClick={onClose}
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
            >
              맞습니다
            </Button>
          </Container>
        </ModalContent>
      </Modal>
    </>
  );
}
