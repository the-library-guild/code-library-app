import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

import getConfig from "next/config";

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()


const defaultApiUrl = createHttpLink({
  uri: serverRuntimeConfig.GRAPHQL_URL ?? publicRuntimeConfig.GRAPHQL_URL
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
