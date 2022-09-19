import { options } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

import { useMemo } from "react";
import { AxiosResponse } from "axios";

import Layout from "../components/layout";
import { Stack } from "@chakra-ui/react";
import { GiPencilRuler } from "react-icons/gi";

import request from "../service/request";
import Table from "../components/Table";

import moment from "moment";
import CardBox from "../components/CardBox";
import Head from "next/head";

export default function Home(props) {
  const upcomingTrial = useMemo(() => {
    return props.upcomingTrial.map((order) => {
      return {
        ...order,
        createdAt: moment(order.createdAt).format("DD/MM/YYYY"),
        trialDate: moment(order.trialDate).format("DD/MM/YYYY"),
        trialDate2: moment(order.trialDate2).format("DD/MM/YYYY"),
      };
    });
  }, [props.upcomingTrial]);

  const upcomingDelivery = useMemo(() => {
    return props.upcomingDelivery.map((order) => {
      return {
        ...order,
        createdAt: moment(order.createdAt).format("DD/MM/YYYY"),
        date: moment(order.deliveryDate).format("DD/MM/YYYY"),
      };
    });
  }, [props.upcomingDelivery]);

  return (
    <>
      <Head>
        <title>Anasayfa</title>
      </Head>
      <Layout>
        <Stack align="center">
          <CardBox
            link="/orders"
            title="Toplam Siparişler"
            value={props.ordersCount}
            icon={GiPencilRuler}
            color="blue.500"
          />
        </Stack>

        <Stack spacing={20} maxW="5xl" mx="auto">
          <Table
            title="Provası Yaklaşanlar"
            captions={[
              "Oluşturma Tarihi",
              "Açıklama",
              "Fiyat",
              "1.Prova Tarihi",
              "2.Prova Tarihi",
            ]}
            data={upcomingTrial}
            rows={[
              "createdAt",
              "description",
              "price",
              "trialDate",
              "trialDate2",
            ]}
          />
          <Table
            title="Teslimatı Yaklaşanlar"
            captions={[
              "Oluşturma Tarihi",
              "Açıklama",
              "Fiyat",
              "Teslim Tarihi",
            ]}
            data={upcomingDelivery}
            rows={["createdAt", "description", "price", "date"]}
          />
        </Stack>
      </Layout>
    </>
  );
}
export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);
  const [ordersCount, upcomingDelivery, upcomingTrial]: Array<AxiosResponse> =
    await Promise.all([
      request.get("orders/count"),
      request.get("orders/upcoming/delivery"),
      request.get("orders/upcoming/trial"),
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
      ordersCount: ordersCount.data,
      upcomingDelivery: upcomingDelivery.data,
      upcomingTrial: upcomingTrial.data,
    },
  };
}
