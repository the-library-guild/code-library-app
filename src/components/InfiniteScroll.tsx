import React, { ReactElement, useEffect, useReducer } from 'react';
import { Text, Spinner, useColorModeValue, Flex } from '@chakra-ui/react';

import useInfiniteScroll from 'react-infinite-scroll-hook';

import { Book } from '@/services/code-library-server/books';

function Loading() {
  return (
    <Flex justify={'center'} textAlign={'center'} gap={4}>
      <Text fontWeight={'bold'} fontSize={'sm'}>
        Loading more books
      </Text>
      <Spinner
        thickness="4px"
        speed="0.65s"
        color={useColorModeValue('gray.600', 'gray.300')}
        size="md"
      />
    </Flex>
  );
}

type State = {
  numberOfBooks: number;
  booksToRender: Book[];
  results: Book[];
};

type Action = {
  type: string;
  payload: {
    results: Book[];
  };
};

const init = (initialResults: Book[]) => {
  return {
    booksToRender: getFirstTen(initialResults),
    numberOfBooks: 10,
    results: initialResults,
  };
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'LOAD_MORE':
      return {
        ...state,
        booksToRender: state.results.slice(0, state.numberOfBooks + 10),
        numberOfBooks: state.numberOfBooks + 10,
      };
    case 'REFRESH':
      return init(action?.payload?.results);
    default:
      return { ...state };
  }
};

type InfiniteScrollRenderProps = {
  booksToRender: Book[];
};

type InfiniteScrollProps = {
  children: (props: InfiniteScrollRenderProps) => ReactElement;
  results: Book[];
  loading: boolean;
};

const getFirstTen = (books: Book[]) => {
  if (books.length < 10) {
    return books;
  }
  return books.slice(0, 10);
};

export const InfiniteScroll = ({
  children,
  results,
  loading,
}: InfiniteScrollProps) => {
  const [state, dispatch] = useReducer(reducer, results, init);

  useEffect(() => {
    if (loading) return;
    dispatch({ type: 'REFRESH', payload: { results } });
  }, [loading, results]);

  const loadMoreBooks = React.useCallback(() => {
    dispatch({ type: 'LOAD_MORE', payload: { results: [] } });
  }, [dispatch]);

  const hasNextPage = state.numberOfBooks < results.length;

  const [scrollRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMoreBooks,
    delayInMs: 1000,
  });

  return (
    <>
      {children({ booksToRender: state.booksToRender })}
      <div ref={scrollRef} />
      {hasNextPage && <Loading />}
    </>
  );
};
