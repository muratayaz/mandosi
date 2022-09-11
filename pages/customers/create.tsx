import Head from "next/head";
import { Box, Stack, Text, useToast } from "@chakra-ui/react";

import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

import request from "../../service/request";
import CustomerForm from "../../components/customers/CustomerForm";
import Layout from "../../components/layout";

export default function NewCustomer() {
  const toast = useToast();

  async function handleFormSubmit(values: object): Promise<boolean> {
    const { status } = await request.post("/customers", values).catch((err) => {
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
        title: "Müşteri başarıyla eklendi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
      return true;
    }
  }

  return (
    <>
      <Head>
        <title>Müşteri Ekle</title>
      </Head>
      <Layout>
        <Box py={5} w="full" maxW="5xl" mx="auto">
          <Stack mb={10}>
            <Text fontSize="xl" fontWeight="semibold">
              Yeni Müşteri Ekle
            </Text>
            <hr />
          </Stack>
          <CustomerForm handleFormSubmit={handleFormSubmit} />
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
