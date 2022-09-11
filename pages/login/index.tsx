import Head from "next/head";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

import { unstable_getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]";

import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import LoginForm from "../../components/auth/form-credentials";

export default function Login() {
  const router = useRouter();

  async function onSubmit(body) {
    await signIn("credentials", body)
      .then((res) => {
        if (res.ok) router.push("/");
        else console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Head>
        <title>Giriş Yap</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        />
      </Head>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Giriş Yapınız</Heading>
          </Stack>
          <Box rounded={"lg"} boxShadow={"lg"} p={8} w="400px">
            <LoginForm onSubmit={onSubmit} />
          </Box>
        </Stack>
      </Flex>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const session = await unstable_getServerSession(req, res, options);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
