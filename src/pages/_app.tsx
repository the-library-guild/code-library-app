import React, { useEffect } from 'react';

import Head from 'next/head';

import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';

import { SessionProvider } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import { CodeLibraryServer } from '../services/code-library-server';

import { PageAuthorizer } from '../components/PageAuthorizer';
import { NextPage } from 'next';
import { InternalPage } from '../components/InternalPage';
import { ExternalPage } from '../components/ExternalPage';
import { PermissionDenied } from '../components/PermissionDenied';
import { MakingAppContextProvider } from '../making-app-context';
import { theme } from '@/helpers/theme';

type NextPageWithLayout = NextPage & {
  permissions: number;
};

type CustomAppProps = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: CustomAppProps) {
  useEffect(() => {
    async function loadWorker() {
      const worker = (await import('../mocks/browser')).worker;
      worker.start();
    }
    if (process.env.NODE_ENV === 'development') {
      loadWorker();
    }
  }, []);

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
  );
}

export default App;
