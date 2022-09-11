import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { theme } from "../theme";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <SessionProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
          {loading && <Loading />}
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}
