import { useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import request from "../../service/request";
import TableRow from "./TableRow";
import Alert from "../Alert";

export default function CustomerTable({ captions, data, setData }) {
  const toast = useToast();
  const textColor = useColorModeValue("gray.800", "white");

  const [customer, setCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  function onOpenAlertModal(value) {
    setCustomer(value);
    onOpenAlert();
  }
  function onCloseAlertModal() {
    setCustomer(null);
    onCloseAlert();
  }

  async function onSubmitDelete() {
    const response = await request
      .delete(`/customers?id=${customer.id}`)
      .catch((err) => {
        toast({
          isClosable: true,
          title: "Bir hata gerçekleşti :(",
          status: "error",
          position: "bottom-right",
          duration: 4000,
        });

        return {
          status: err.response.status,
          data: err.response.data,
        };
      });

    if (response.status === 200) {
      toast({
        isClosable: true,
        title: "Müşteri başarıyla silindi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
      setData((prev) => prev.filter((p) => p.id !== customer.id));
    }
    onCloseAlertModal();
  }

  return (
    <Box overflowX="auto">
      <Flex direction="column" gap={5} w={{ md: "50%" }}>
        <Text fontWeight="medium" color={textColor}>
          Müşteriler
        </Text>

        <InputGroup maxW="md" color={textColor}>
          <InputLeftElement children={<MdSearch />} />
          <Input
            placeholder="Arama yapınız..."
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>
      </Flex>

      <Box mt={5}>
        <Table
          variant="striped"
          colorScheme={useColorModeValue("facebook", "gray")}
        >
          <Thead>
            <Tr pl="0px">
              {captions.map((caption, idx) => {
                return (
                  <Th color={textColor} key={idx}>
                    <Text noOfLines={2}>{caption}</Text>
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map(
              (row) =>
                (String(row.name)
                  .toLocaleLowerCase()
                  .includes(String(search).toLocaleLowerCase()) ||
                  String(row.phone)
                    .toLocaleLowerCase()
                    .includes(String(search).toLocaleLowerCase()) ||
                  search.length === 0) && (
                  <TableRow
                    key={row.id}
                    id={row.id}
                    name={row.name}
                    image={row.image}
                    phone={row.phone}
                    date={row.updatedAt}
                    orders={row.Orders}
                    onOpenAlert={() => onOpenAlertModal(row)}
                  />
                )
            )}
          </Tbody>
        </Table>

        <Alert
          isOpen={isOpenAlert}
          onClose={onCloseAlertModal}
          headText="Müşteriyi Sil?"
          bodyText="Müşteriyi silmek istediğinize emin misiniz?"
          handleDelete={onSubmitDelete}
        />
      </Box>
    </Box>
  );
}
