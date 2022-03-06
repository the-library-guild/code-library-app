import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const defaultApiUrl = createHttpLink({
  uri: process.env.GRAPHQL_URL,
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

// This hack is not cool at all but I can't solve this issue in a better way now :(
const apiUrlFromDocker = createHttpLink({
  uri: process.env.APP_ENV === 'docker' ? 'http://api:4000/graphql/' : process.env.GRAPHQL_URL,
});

export const apiClientFromServer = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([fetchOptionLink, apiUrlFromDocker]),
});
