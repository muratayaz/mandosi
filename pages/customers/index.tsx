import { useState } from "react";
import Head from "next/head";

import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

import request from "../../service/request";
import CustomerTable from "../../components/customers/Table";
import Layout from "../../components/layout";

export default function Customers(props) {
  const [customers, setCustomers] = useState(props.customers);

  return (
    <>
      <Head>
        <title>Müşteriler</title>
      </Head>
      <Layout>
        <CustomerTable
          captions={["İsim", "Ürün", "Toplam Borç", "Güncellenme Tarihi", ""]}
          data={customers}
          setData={setCustomers}
        />
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
