import Head from "next/head";

import { options } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import { Box, Stack, Text, useToast } from "@chakra-ui/react";

import request from "../../service/request";
import OrderForm from "../../components/orders/OrderForm";
import Layout from "../../components/layout";

export default function NewCustomer(props) {
  const toast = useToast();

  async function handleFormSubmit(values: object): Promise<boolean> {
    const { status } = await request.post("/orders", values).catch((err) => {
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

    if (status === 200) {
      toast({
        isClosable: true,
        title: "Sipariş başarıyla eklendi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
      return true;
    }
    return false;
  }

  return (
    <>
      <Head>
        <title>Sipariş Ekle</title>
      </Head>
      <Layout>
        <Box py={5} w="full" maxW="5xl" mx="auto">
          <Stack mb={10}>
            <Text fontSize="xl" fontWeight="semibold">
              Yeni Sipariş Ekle
            </Text>
            <hr />
          </Stack>
          <OrderForm
            customers={props.customers}
            handleFormSubmit={handleFormSubmit}
          />
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);
  const { data } = await request.get("/customers");

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      customers: data,
    },
  };
}
