import React from 'react';

import Head from 'next/head';

import type { AppProps } from 'next/app';

import { ChakraProvider, Stack, Text } from '@chakra-ui/react';

import { SessionProvider } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import { CodeLibraryServer } from '../services/code-library-server';

import { PageAuthorizer } from '../components/PageAuthorizer';
import { NextPage } from 'next';
import { InternalPage } from '../components/InternalPage';
import { MakingAppContextProvider } from '../making-app-context';
import { theme } from '@/helpers/theme';

type NextPageWithLayout = NextPage & {
  permissions: number;
  title: string;
};

type CustomAppProps = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={CodeLibraryServer}>
        <Head>
          <title>Treedom Library</title>
          <meta
            name="description"
            content="CODE University of Applied Sciences Library Management System"
          />
        </Head>
        <ChakraProvider theme={theme}>
          <MakingAppContextProvider>
            <LibraryApp Component={Component} pageProps={pageProps} />
          </MakingAppContextProvider>
        </ChakraProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}

type LibraryAppProps = {
  Component: NextPageWithLayout;
  pageProps: any;
};

function LibraryApp({ Component, pageProps }: LibraryAppProps) {
  return Component.permissions ? (
    <PageAuthorizer requiredPermissions={Component.permissions}>
      {({ user, hasRequiredPermissions }) => {
        return (
          <InternalPage user={user} title={Component.title}>
            {hasRequiredPermissions ? (
              <Component {...pageProps} />
            ) : (
              <Stack spacing={4} width="100%">
                <Text>Unfortunately you do not access this feature :(</Text>
              </Stack>
            )}
          </InternalPage>
        );
      }}
    </PageAuthorizer>
  ) : (
    <Component {...pageProps} />
  );
}

export default App;
