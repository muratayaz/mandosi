import {
  Avatar,
  Box,
  Flex,
  IconButton,
  SimpleGrid,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";

import { options } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import { customerDetailTypes } from "../../../constants/customer";

import moment from "moment";
import request from "../../../service/request";
import { useMemo, useRef } from "react";
import { MdDownload, MdEdit } from "react-icons/md";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useReactToPrint } from "react-to-print";
import Head from "next/head";

export default function CustomerDetail({ customer }) {
  const router = useRouter();
  const colorMode = useColorModeValue("black", "white");
  const colorMode2 = useColorModeValue("gray.700", "gray.300");

  const customerRef = useRef();
  const paymentRef = useRef();

  const handlePrintCustomer = useReactToPrint({
    content: () => customerRef.current,
    pageStyle: "color:#000000",
  });
  const handlePrintPayment = useReactToPrint({
    content: () => paymentRef.current,
    pageStyle: "color:#000000",
  });

  const totalPrice = useMemo(() => {
    let debt = 0;
    let total = 0;
    customer.Orders.forEach((order) => {
      total += order.price;
      debt += order.paid;
    });

    return {
      total,
      debt: total - debt,
    };
  }, [customer.Orders]);

  const InfoText = ({ title, text }: { title: string; text: string }) => (
    <Flex gap={2.5} alignItems="center" w="full">
      <Text color={colorMode} fontWeight="semibold" fontSize="md" noOfLines={1}>
        {title}
      </Text>
      <Text color={colorMode2} fontWeight="medium" noOfLines={1} h="24px">
        {text}
      </Text>
    </Flex>
  );

  if (!customer) return null;

  return (
    <>
      <Head>
        <title>Müşteri Detay | {customer.name}</title>
      </Head>
      <Layout>
        <Stack spacing={10} w="full" maxW="3xl" mx="auto" py={10}>
          <Stack spacing={5}>
            <Avatar
              src={customer.image && customer.image.url}
              w="100px"
              h="100px"
              alignSelf="center"
            />
            <Flex alignItems="center" justifyContent="center" gap={5}>
              <IconButton
                variant="outline"
                aria-label="edit"
                colorScheme="blue"
                icon={<MdEdit />}
                onClick={() =>
                  router.push(
                    "/customers/edit/[id]",
                    `/customers/edit/${customer.id}`
                  )
                }
              />
              <IconButton
                variant="outline"
                aria-label="delete"
                colorScheme="red"
                icon={<MdDownload />}
                onClick={handlePrintCustomer}
              />
            </Flex>
          </Stack>

          <Stack spacing={10} ref={customerRef}>
            <Stack spacing={5}>
              <Text color={colorMode} fontSize="xl" fontWeight="semibold">
                Müşteri Bilgileri
              </Text>
              <hr />

              <SimpleGrid columns={{ sm: 2 }} rowGap={5} columnGap={10}>
                <InfoText title="İsim:" text={customer.name} />
                <InfoText title="Tel:" text={customer.phone} />
                <InfoText title="Adres:" text={customer.address} />
                <InfoText title="Mail:" text={customer.email} />
                <InfoText
                  title="Doğum Tarihi:"
                  text={moment(customer.birthday).format("DD/MM/YYYY")}
                />
              </SimpleGrid>
            </Stack>

            <Stack spacing={5}>
              <Text color={colorMode} fontSize="xl" fontWeight="semibold">
                Ölçü Bilgileri
              </Text>
              <hr />

              <SimpleGrid columns={{ sm: 3 }} gap={7}>
                {Object.keys(customerDetailTypes).map((key, idx) => {
                  const { title, type } = customerDetailTypes[key];
                  const text = customer.Detail[key];

                  return (
                    <InfoText
                      key={idx}
                      title={`${title}:`}
                      text={`${text} ${type === "number" && text ? "cm" : ""}`}
                    />
                  );
                })}
              </SimpleGrid>
            </Stack>

            <Stack spacing={5}>
              <Text color={colorMode} fontSize="xl" fontWeight="semibold">
                Sipariş Bilgileri
              </Text>
              <hr />

              <InfoText
                title="Sipariş Sayısı:"
                text={`${customer.Orders.length} Adet`}
              />
              <InfoText title="Toplam Borç:" text={`${totalPrice.debt} TL`} />
              <InfoText title="Toplam Tutar:" text={`${totalPrice.total} TL`} />
            </Stack>
          </Stack>

          <Flex justifyContent="space-between" gap={5}>
            <Box overflowX="auto" ref={paymentRef}>
              <Table>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    {[
                      "Oluşturma Tarihi",
                      "Ürün",
                      "Ödenen",
                      "Toplam",
                      "Açıklama",
                      "Teslim Tarihi",
                    ].map((caption, idx) => {
                      return (
                        <Th
                          key={idx}
                          color={colorMode}
                          ps={idx === 0 ? "0px" : null}
                          align="center"
                          fontWeight="medium"
                        >
                          <Text textAlign="left" noOfLines={2}>
                            {caption}
                          </Text>
                        </Th>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {customer.Orders.map((order, idx) => {
                    return (
                      <Tr
                        key={idx}
                        my=".8rem"
                        pl="0px"
                        color="gray.400"
                        _hover={{ _dark: { bg: "gray.700" }, bg: "gray.100" }}
                        cursor="pointer"
                        onClick={() => router.push(`/orders/edit/${order.id}`)}
                      >
                        <Td ps="0px" align="center">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={1}
                          >
                            {moment(order.createdAt).format("DD/MM/YYYY")}
                          </Text>
                        </Td>
                        <Td align="center">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={1}
                          >
                            {order.type}
                          </Text>
                        </Td>
                        <Td align="center">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={1}
                          >
                            {order.paid} TL
                          </Text>
                        </Td>
                        <Td align="center">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={1}
                          >
                            {order.price} TL
                          </Text>
                        </Td>
                        <Td align="center" maxW="200px">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={3}
                          >
                            {order.description}
                          </Text>
                        </Td>
                        <Td align="center">
                          <Text
                            color={colorMode2}
                            fontWeight="medium"
                            noOfLines={1}
                          >
                            {moment(order.deliveryDate).format("DD/MM/YYYY")}
                          </Text>
                        </Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </Box>

            <IconButton
              variant="outline"
              aria-label="delete"
              colorScheme="red"
              icon={<MdDownload />}
              onClick={handlePrintPayment}
            />
          </Flex>
        </Stack>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res, params }) {
  const session = await unstable_getServerSession(req, res, options);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { status, data } = await request.get(`customers/${params.id}`);
  return {
    props: {
      customer: status === 200 ? data : null,
    },
  };
}
