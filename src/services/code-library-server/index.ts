import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const isCallingFromServer = typeof window === 'undefined';

const uri = isCallingFromServer
  ? process.env.GRAPHQL_URL
  : process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const CodeLibraryServer = new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export * from './queries';
export * from './mutations';
export * from './books';

export default CodeLibraryServer;
