import { ApolloClient, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const apiClient = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  credentials: 'include',
});
