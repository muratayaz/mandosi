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
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import TableRow from "./TableRow";

export default function OrderTable({ captions, data }) {
  const textColor = useColorModeValue("gray.800", "white");
  const [search, setSearch] = useState("");

  return (
    <Box overflowX="auto" px={{ sm: 5 }}>
      <Flex direction="column" gap={5} w={{ md: "50%" }}>
        <Text fontWeight="medium" fontSize="lg" color={textColor}>
          Siparişler
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
                  String(row.Customer.name)
                    .toLocaleLowerCase()
                    .includes(String(search).toLocaleLowerCase()) ||
                  String(row.description)
                    .toLocaleLowerCase()
                    .includes(String(search).toLocaleLowerCase()) ||
                  search.length === 0) && (
                  <TableRow
                    key={row.id}
                    id={row.id}
                    image={row.image}
                    createdAt={row.createdAt}
                    price={row.price}
                    paid={row.paid}
                    deliveryDate={row.deliveryDate}
                    description={row.description}
                    customer={row.Customer}
                  />
                )
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
