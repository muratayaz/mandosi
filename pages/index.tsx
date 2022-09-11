import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import { useMemo } from "react";
import { AxiosResponse } from "axios";

import Layout from "../components/layout";
import { SimpleGrid } from "@chakra-ui/react";
import { GiPencilRuler } from "react-icons/gi";

import request from "../service/request";
import Table from "../components/Table";

import moment from "moment";
import CardBox from "../components/CardBox";
import Head from "next/head";

export default function Home(props) {
  const lastOrders = useMemo(() => {
    return props.lastOrders.map((order) => {
      return {
        ...order,
        deliveryDate: moment(order.deliveryDate).format("DD/MM/YYYY"),
      };
    });
  }, [props.lastOrders]);
  const deliveryDate = useMemo(() => {
    return props.deliveryDate.map((order) => {
      return {
        ...order,
        deliveryDate: moment(order.deliveryDate).format("DD/MM/YYYY"),
      };
    });
  }, [props.deliveryDate]);
  const trialDate = useMemo(() => {
    return props.trialDate.map((order) => {
      return {
        ...order,
        trialDate: moment(order.trialDate).format("DD/MM/YYYY"),
      };
    });
  }, [props.trialDate]);
  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <Layout>
        <CardBox
          link="/orders"
          title="Siparişler"
          value={props.ordersCount}
          icon={GiPencilRuler}
          color="blue.500"
        />

        <SimpleGrid columns={{ base: 1, xl: 2 }} gap={10}>
          <Table
            title="Son 10 Sipariş"
            captions={["Sipariş", "Açıklama", "Teslim Tarihi"]}
            data={lastOrders}
            rows={["name", "description", "deliveryDate"]}
          />
          <Table
            title="Prova Yaklaşanlar"
            captions={["Sipariş", "Açıklama", "Fiyat", "Prova Tarihi"]}
            data={trialDate}
            rows={["name", "description", "price", "trialDate"]}
          />
          <Table
            title="Teslimatı Yaklaşanlar"
            captions={["Sipariş", "Açıklama", "Fiyat", "Teslim Tarihi"]}
            data={deliveryDate}
            rows={["name", "description", "price", "deliveryDate"]}
          />
        </SimpleGrid>
      </Layout>
    </>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);
  const [
    lastOrders,
    ordersCount,
    deliveryDate,
    trialDate,
  ]: Array<AxiosResponse> = await Promise.all([
    request.get("orders/last"),
    request.get("orders/count"),
    request.get("orders/deliveryDate"),
    request.get("orders/trialDate"),
  ]);

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
      lastOrders: lastOrders.data,
      ordersCount: ordersCount.data,
      deliveryDate: deliveryDate.data,
      trialDate: trialDate.data,
    },
  };
}
