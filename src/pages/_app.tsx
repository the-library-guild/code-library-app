import React from 'react';

import Head from 'next/head';

import type { AppProps } from 'next/app';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import { SessionProvider } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import { apiClient } from '../services/apollo-client';

import { PageAuthorizer } from '../components/PageAuthorizer';
import { NextPage } from 'next';
import { InternalPage } from '../components/InternalPage';
import { ExternalPage } from '../components/ExternalPage';
import { PermissionDenied } from '../components/PermissionDenied';

const theme = extendTheme({
  initialColorMode: 'system',
  colors: {
    primary: {
      50: '#35daad',
      100: '#35daad',
      200: '#97dcc9',
    },
    secondary: {
      100: '#4059AD',
      200: '#6577b2',
    },
  },
});

type NextPageWithLayout = NextPage & {
  permissions: number;
};

type CustomAppProps = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={apiClient}>
        <Head>
          <title>Treedom Library</title>
          <meta
            name="description"
            content="CODE University of Applied Sciences Library Management System"
          />
        </Head>
        <ChakraProvider theme={theme}>
          {Component.permissions ? (
            <PageAuthorizer requiredPermissions={Component.permissions}>
              {({ user, hasRequiredPermissions }) => {
                return (
                  <InternalPage user={user}>
                    {hasRequiredPermissions ? (
                      <Component {...pageProps} />
                    ) : (
                      <PermissionDenied />
                    )}
                  </InternalPage>
                );
              }}
            </PageAuthorizer>
          ) : (
            <ExternalPage>
              <Component {...pageProps} />
            </ExternalPage>
          )}
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

export default App;
