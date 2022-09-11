import {
  Stack,
  Text,
  Table as ChakraTable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from "@chakra-ui/react";

interface TableProps {
  title?: string;
  captions: Array<string>;
  data: Array<any>;
  rows: Array<string>;
  onCLick?: any;
}

export default function Table({
  title,
  captions,
  rows,
  data,
  onCLick,
}: TableProps) {
  const textColor = useColorModeValue("gray.800", "white");
  return (
    <Stack spacing={5} mt={10} overflow="auto" maxH={500}>
      <Text fontSize="md" fontWeight="bold" color={textColor}>
        {title}
      </Text>
      <ChakraTable
        // variant="striped"
        colorScheme={useColorModeValue("facebook", "gray")}
        h="full"
      >
        <Thead>
          <Tr pl="0px">
            {captions.map((caption, idx) => {
              return (
                <Th key={idx} color={textColor}>
                  <Text noOfLines={2}>{caption}</Text>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, idx) => (
            <Tr
              key={idx}
              cursor="pointer"
              transition="all .2s ease-in-out"
              onClick={() => (onCLick ? onCLick(row) : null)}
            >
              {rows.map((rowName, idx) => (
                <Td key={idx} color={textColor}>
                  <Text noOfLines={3}>{row[rowName]}</Text>
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>
    </Stack>
  );
}
