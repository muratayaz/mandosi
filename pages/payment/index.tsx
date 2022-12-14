import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

import { useMemo } from "react";
import { AxiosResponse } from "axios";
import request from "../../service/request";

import Layout from "../../components/layout";
import CardBox from "../../components/CardBox";
import Table from "../../components/Table";
import { GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { Flex, Stack } from "@chakra-ui/react";
import Head from "next/head";
import moment from "moment";

export default function Payment(props) {
  const customers = useMemo(() => {
    return props.debtorCustomers.map(({ createdAt, paid, price, Customer }) => {
      return {
        createdAt: moment(createdAt).format("DD/MM/YYYY"),
        debt: price - paid,
        customerName: Customer.name,
      };
    });
  }, [props.debtorCustomers]);

  return (
    <>
      <Head>
        <title>Ödemeler</title>
      </Head>
      <Layout>
        <Flex
          minW="full"
          align="center"
          justifyContent="center"
          flexWrap="wrap"
          gap={10}
        >
          <CardBox
            link="/customers"
            title="Alınan Avans"
            value={`${props.debtorsSum ?? 0} TL`}
            icon={GiPayMoney}
            color="red.500"
          />
          <CardBox
            link="/customers"
            title="Toplam Borç"
            value={`${props.incomeSum - props.debtorsSum ?? 0} TL`}
            icon={GiPayMoney}
            color="red.500"
          />
          <CardBox
            link="/customers"
            title="Toplam Tutar"
            value={`${props.incomeSum ?? 0} TL`}
            icon={GiReceiveMoney}
            color="green.500"
          />
        </Flex>

        <Stack mt={10} maxW="5xl" mx="auto">
          <Table
            title="Ödeme Bekleyen"
            captions={["Oluşturma Tarihi", "Müşteri", "Borç"]}
            data={customers}
            rows={["createdAt", "customerName", "debt"]}
          />
        </Stack>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);
  const [incomeSum, debtorsSum, debtorCustomers]: Array<AxiosResponse> =
    await Promise.all([
      request.get("orders/income/sum"),
      request.get("orders/debtors/sum"),
      request.get("orders/debtors/customers"),
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
      incomeSum: incomeSum.data._sum.price,
      debtorsSum: debtorsSum.data._sum.paid,
      debtorCustomers: debtorCustomers.data,
    },
  };
}
