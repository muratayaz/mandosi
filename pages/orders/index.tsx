import Head from "next/head";

import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

import request from "../../service/request";
import OrdersTable from "../../components/orders/Table";
import Layout from "../../components/layout";

export default function Orders(props) {
  return (
    <>
      <Head>
        <title>Siparişler</title>
      </Head>

      <Layout>
        <OrdersTable
          captions={[
            "İsim",
            "Müşteri",
            "Kalan Tutar",
            "Açıklama",
            "Teslim Tarihi",
          ]}
          data={props.orders}
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);
  const orders = await request.get("orders");

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
      orders: orders.data,
    },
  };
}
