import React from 'react';

import Head from 'next/head';

import { SessionProvider } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import { LibraryAppProps, LibraryAppWithProviders } from '@/components/App';

import { CodeLibraryServer } from '@/services/code-library-server';

function App({ Component, pageProps }: LibraryAppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <ApolloProvider client={CodeLibraryServer}>
        <Head>
          <title>Treedome Library</title>
          <meta
            name="description"
            content="CODE University of Applied Sciences Library Management System"
          />
        </Head>
        <LibraryAppWithProviders Component={Component} pageProps={pageProps} />
      </ApolloProvider>
    </SessionProvider>
  );
}

export default App;
