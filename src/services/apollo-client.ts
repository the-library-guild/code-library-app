import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;

export const apiClient = new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
