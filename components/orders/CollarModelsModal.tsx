import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
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
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import { MdRestoreFromTrash, MdSearch } from "react-icons/md";
import { collarModel } from "../../constants/collarModel";

function CollarModelsModal({ selected, setValue, clearModel }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const textColor = useColorModeValue("gray.800", "white");
  const [search, setSearch] = useState("");

  return (
    <>
      <Flex gap={2} alignItems="center" justifyContent="center">
        <Button w="full" onClick={onOpen}>
          Model Seç
        </Button>
        {selected && (
          <Icon
            as={MdRestoreFromTrash}
            color="red.500"
            cursor="pointer"
            fontSize={36}
            onClick={clearModel}
          />
        )}
      </Flex>

      <Modal
        isCentered
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent h="full" w="3xl">
          <ModalHeader>Model Seç</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup maxW="full" color={textColor} mb={5}>
              <InputLeftElement children={<MdSearch />} />
              <Input
                placeholder="Arama yapınız..."
                type="search"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
            <SimpleGrid columns={3} spacing={10}>
              {collarModel.map(
                (item, idx) =>
                  (String(item.name)
                    .toLocaleLowerCase()
                    .includes(String(search).toLocaleLowerCase()) ||
                    search.length === 0) && (
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
                  )
              )}
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
