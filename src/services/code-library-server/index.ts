import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const inDevelopmentModeWithoutStorybook =
  process.env.NODE_ENV === 'development' && process.env.STORYBOOK_MODE !== 'on';

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

export * from './queries';
export * from './mutations';
export * from './books';
export * from './use-create-book.hook';

export default CodeLibraryServer;
