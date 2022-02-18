import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const uriLink = createHttpLink({
  uri: process.env.GRAPHQL_URL,
});
const fetchOptionLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    credentials: "include",
    headers,
  }));
  return forward(operation);
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([fetchOptionLink, uriLink]),
});
export default client;
