import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const defaultApiUrl = createHttpLink({
  uri: process.env.GRAPHQL_URL
});

const fetchOptionLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    credentials: "include",
    headers,
  }));
  return forward(operation);
});

export const apiClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([fetchOptionLink, defaultApiUrl]),
});
