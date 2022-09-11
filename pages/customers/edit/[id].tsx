import Head from "next/head";
import { Box, Stack, Text, useToast } from "@chakra-ui/react";
import request from "../../../service/request";
import CustomerForm from "../../../components/customers/CustomerForm";
import Layout from "../../../components/layout";
import { unstable_getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]";

export default function EditCustomer(props) {
  const toast = useToast();

  async function handleFormSubmit(values) {
    Object.assign(values, { id: props.customer.id });
    if (!values.imageId) delete values.imageId;

    const { status } = await request.put("/customers", values).catch((err) => {
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
        title: "Müşteri başarıyla güncellendi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Müşteri Düzenle</title>
      </Head>
      <Layout>
        <Box py={5} w="full" maxW="5xl" mx="auto">
          <Stack mb={10}>
            <Text fontSize="xl" fontWeight="semibold">
              Müşteri Düzenle
            </Text>
            <hr />
          </Stack>
          <CustomerForm
            customer={props.customer}
            handleFormSubmit={handleFormSubmit}
          />
        </Box>
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
