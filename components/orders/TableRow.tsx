import { Flex, Image, Td, Text, Tr, useColorModeValue } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";

export default function TableRow({
  id,
  createdAt,
  image,
  price,
  paid,
  deliveryDate,
  customer,
  description,
}) {
  const textColor = useColorModeValue("gray.800", "white");
  const router = useRouter();

  function handleEdit() {
    router.push("/orders/edit/[id]", `/orders/edit/${id}`);
  }

  return (
    <Tr
      color={textColor}
      cursor="pointer"
      transition="all .2s ease-in-out"
      onClick={handleEdit}
    >
      <Td minW="150px">
        <Image
          src={image && image.url}
          w="60px"
          h="60px"
          objectFit="cover"
          objectPosition="center"
          borderRadius="12px"
          fallbackSrc="https://via.placeholder.com/50"
        />
        <Text mt={2.5} ml={1} noOfLines={2}>
          {moment(createdAt).format("DD/MM/YYYY")}
        </Text>
      </Td>

      <Td>
        <Text>{customer.name}</Text>
      </Td>

      <Td minW="150px">
        <Text>{price - paid} TL</Text>
      </Td>

      <Td minW="150px">
        <Text noOfLines={3}>{description}</Text>
      </Td>

      <Td minW="150px">
        <Text pl={1}>
          {moment(deliveryDate).format("DD/MM/YYYY").toLocaleLowerCase()}
        </Text>
      </Td>
    </Tr>
  );
}
