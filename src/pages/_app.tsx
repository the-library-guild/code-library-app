import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";

import client from "../services/apollo-client";

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import "../styles/reset.css";
import "../styles/globals.css";

const theme = extendTheme({
  initialColorMode: 'dark',
  colors: {
    primary: {
      100: "#35daad",
      200: "#97dcc9"
    },
    secondary: {
      100: "#4059AD",
      200: "#6577b2"
    }
  }
})

function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={client}>
        <Head>
          <title>CODE Library</title>
          <meta
            name="description"
            content="CODE University of Applied Sciences Library Management System"
          />
        </Head>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
export default App;
