import { NextPage } from 'next';

import { ChakraProvider } from '@chakra-ui/react';

import { AppProps as NextAppProps } from 'next/app';

import { InternalPage } from './InternalPage';
import { PageAuthorizer } from './PageAuthorizer';
import { PermissionDeniedWidget } from './PermissionDeniedWidget';
import { MakingAppContextProvider } from 'making-app-context';
import { theme } from '@/helpers/theme';

export type NextPageWithLayout = NextPage & {
  permissions: number;
  title: string;
};

export type LibraryAppProps = NextAppProps & {
  Component: NextPageWithLayout;
};

export type AppProps = {
  Component: NextPageWithLayout;
  pageProps: any;
};

export function LibraryApp({ Component, pageProps }: AppProps) {
  return Component.permissions ? (
    <PageAuthorizer requiredPermissions={Component.permissions}>
      {({ user, hasRequiredPermissions }) => {
        return (
          <InternalPage user={user} title={Component.title}>
            {hasRequiredPermissions ? (
              <Component {...pageProps} />
            ) : (
              <PermissionDeniedWidget />
            )}
          </InternalPage>
        );
      }}
    </PageAuthorizer>
  ) : (
    <Component {...pageProps} />
  );
}

export function LibraryAppWithProviders({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <MakingAppContextProvider>
        <LibraryApp Component={Component} pageProps={pageProps} />
      </MakingAppContextProvider>
    </ChakraProvider>
  );
}

export default LibraryAppWithProviders;
