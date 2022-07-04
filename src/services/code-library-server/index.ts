import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const inDevelopmentModeWithoutStorybook =
  process.env.NODE_ENV === 'development' &&
  process.env.MSW_MODE === 'on' &&
  typeof window !== 'undefined';

if (inDevelopmentModeWithoutStorybook) {
  const loadWorker = async () => {
    const worker = (await import('@/mocks/browser')).worker;
    worker.start();
  };
  loadWorker();
}

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

export const checkMutationContainErrors = (response) => {
  const { __typename: type, ...context } = response;

  switch (type) {
    case 'MissingPermissionsError':
      return {
        title: 'Unauthorized',
        description: context.msg,
      };
    case 'Error':
      return {
        title: 'Internal Error',
        description: context.msg,
      };
    default:
      return undefined;
  }
};

export * from './queries';
export * from './mutations';
export * from './books';
export * from './use-create-book.hook';

export default CodeLibraryServer;
