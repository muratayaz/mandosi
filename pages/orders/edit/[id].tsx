import Head from "next/head";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

import { unstable_getServerSession } from "next-auth";
import { options } from "../../api/auth/[...nextauth]";
import { useReactToPrint } from "react-to-print";

import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import request from "../../../service/request";
import OrderForm from "../../../components/orders/OrderForm";
import Layout from "../../../components/layout";
import Alert from "../../../components/Alert";
import { MdDelete, MdDownload } from "react-icons/md";

export default function EditOrder(props) {
  const toast = useToast();
  const router = useRouter();
  const componentRef = useRef();

  const [order, setOrder] = useState(props.order ?? {});

  const {
    isOpen: isOpenAlert,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  async function handleFormSubmit(values) {
    Object.assign(values, { id: order.id });
    if (!values.imageId) delete values.imageId;

    const { status, data } = await request
      .put("/orders", values)
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
    if (status === 200) {
      toast({
        isClosable: true,
        title: "Sipariş başarıyla güncellendi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
      setOrder(data);
    }
  }

  async function onSubmitDelete() {
    const response = await request
      .delete(`/orders?id=${order.id}`)
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
        title: "Sipariş başarıyla silindi.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
      });
      router.push("/orders");
    }
    onCloseAlert();
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: "color:#000000",
  });

  return (
    <>
      <Head>
        <title>Sipariş Düzenle</title>
      </Head>
      <Layout>
        <Box py={5} w="full" maxW="5xl" mx="auto">
          <Stack mb={10}>
            <Flex justify="space-between" align="center" gap={5}>
              <Text fontSize="xl" fontWeight="semibold">
                Sipariş Düzenle
              </Text>

              <Flex align="center" gap={5}>
                <IconButton
                  variant="outline"
                  aria-label="delete"
                  colorScheme="blue"
                  icon={<MdDownload />}
                  onClick={handlePrint}
                />
                <IconButton
                  variant="outline"
                  aria-label="edit"
                  colorScheme="red"
                  icon={<MdDelete />}
                  onClick={onOpenAlert}
                />
              </Flex>
            </Flex>
            <hr />
          </Stack>
          <Stack ref={componentRef}>
            <OrderForm
              order={order}
              customers={props.customers}
              handleFormSubmit={handleFormSubmit}
            />
          </Stack>

          <Alert
            isOpen={isOpenAlert}
            onClose={onCloseAlert}
            headText="Siparişi Sil?"
            bodyText="Siparişi silmek istediğinize emin misiniz?"
            handleDelete={onSubmitDelete}
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

  const customers = await request.get("customers");
  const order = await request.get(`orders/${params.id}`);

  return {
    props: {
      customers: customers.data,
      order: order.data,
    },
  };
}
