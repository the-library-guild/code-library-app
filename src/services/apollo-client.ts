import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  from,
} from "@apollo/client";

const uri = process.env.NEXT_PUBLIC_GRAPHQL_URL;

const defaultApiUrl = createHttpLink({ uri });

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
