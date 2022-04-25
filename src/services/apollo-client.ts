import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

import getConfig from 'next/config';

const config = getConfig();

const uri = config.publicRuntimeConfig.NEXT_PUBLIC_GRAPHQL_URL as string;

console.log('NEXT_PUBLIC_GRAPHQL_URL', uri);

export const apiClient = new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
