import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;
const clientUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

console.log('NEXT_PUBLIC_GRAPHQL_URL', uri);
console.log('NEXT_PUBLIC_CLIENT_URL', clientUrl);

export const apiClient = new ApolloClient({
  link: new HttpLink({
    uri,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});
