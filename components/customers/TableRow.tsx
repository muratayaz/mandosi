import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { MdArrowDropDown } from "react-icons/md";

export default function TableRow({
  id,
  name,
  image,
  phone,
  date,
  orders,
  onOpenAlert,
}) {
  const textColor = useColorModeValue("gray.800", "white");
  const router = useRouter();

  function handleEdit() {
    router.push("/customers/edit/[id]", `/customers/edit/${id}`);
  }
  function handleDetail() {
    router.push("/customers/detail/[id]", `/customers/detail/${id}`);
  }

  const calcDebt = useMemo(() => {
    let debt = 0;
    let total = 0;
    orders.forEach((order) => {
      total += order.price;
      debt += order.paid;
    });
    return total - debt;
  }, [orders]);

  return (
    <Tr color={textColor} cursor="pointer" transition="all .2s ease-in-out">
      <Td minWidth="200px">
        <Flex
          w="full"
          align="center"
          pl={2}
          gap={2}
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <Avatar
            src={image && image.url}
            w="50px"
            borderRadius="12px"
            me="18px"
          />
          <Flex direction="column">
            <Text>{name}</Text>
            <Text>{phone}</Text>
          </Flex>
        </Flex>
      </Td>

      <Td minW="150px">
        <Text>{orders?.length ?? 0} ürün mevcut</Text>
      </Td>

      <Td minW="150px">
        <Text>{calcDebt ?? 0} TL</Text>
      </Td>

      <Td minW="150px">
        <Text>
          {moment(date).utc().format("DD/MM/YYYY HH:mm").toLocaleLowerCase()}
        </Text>
      </Td>

      <Td minW="150px" color={textColor}>
        <Menu placement="bottom-end">
          <MenuButton as={Button} rightIcon={<MdArrowDropDown />}>
            İşlemler
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleEdit}>Düzenle</MenuItem>
            <MenuItem onClick={handleDetail}>Bilgiler</MenuItem>
            <MenuItem onClick={onOpenAlert}>Sil</MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
