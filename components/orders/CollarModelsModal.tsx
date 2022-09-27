import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { collarModel } from "../../constants/collorModel";

function CollarModelsModal({ selected, setValue }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(selected);
  return (
    <>
      <Button w="full" onClick={onOpen}>
        Yaka Modeli Seç
      </Button>

      <Modal
        isCentered
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent w="3xl">
          <ModalHeader>Yaka Modelleri</ModalHeader>
          <ModalCloseButton />
          <ModalBody w="3xl">
            <SimpleGrid columns={3} spacing={10}>
              {collarModel.map((item, idx) => (
                <Stack
                  key={idx}
                  cursor="pointer"
                  _hover={{ bg: "gray.400" }}
                  bg={item.id === selected ? "gray.400" : ""}
                  p={2}
                  onClick={() => {
                    setValue(
                      "detail.collarModel",
                      selected === item.id ? "" : item.id
                    );
                    onClose();
                  }}
                >
                  <Text textAlign="center">{item.name}</Text>
                  <Stack maxW={200}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      objectFit="contain"
                      objectPosition="center"
                    />
                  </Stack>
                </Stack>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Kapat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CollarModelsModal;
