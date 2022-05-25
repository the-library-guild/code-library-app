import React, { useEffect } from 'react';

import { Stack } from '@chakra-ui/react';

import { ApolloError } from '@apollo/client';

import { useSearch } from '@/components/Search';
import { SearchBox } from '@/components/Search/SearchBox';
import { BooksContainer } from '@/components/BooksContainer';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { ResultsCount } from '@/components/ResultsCount';
import { Book } from '@/services/code-library-server/books';
import { Header, HeaderLeftSideNode } from '../Sidebar/Header';

type ShelfViewProps = {
  loading: boolean;
  error: ApolloError | undefined;
  books: Book[];
};

function ShelfView({ loading, error, books }: ShelfViewProps) {
  const { results, ...search } = useSearch();

  useEffect(() => {
    if (loading) {
      return;
    }

    search.setInitialResults(books);
  }, [books, loading, search]);

  return (
    <>
      <Stack w={'100%'}>
        <Header p={0} w={'100%'}>
          <HeaderLeftSideNode>Shelf</HeaderLeftSideNode>
        </Header>
        <Stack spacing={4} width="100%" px={4}>
          <SearchBox
            searchTerm={search.searchTerm}
            setSearchTerm={search.setSearchTerm}
          />
          {!loading && (
            <ResultsCount
              count={results.length}
              text={search.searchTerm ? 'Results' : 'Books in the shelf'}
            />
          )}
          <Stack spacing={6} wordBreak="break-all" width="100%">
            <InfiniteScroll results={results} loading={loading}>
              {({ booksToRender }) => {
                return (
                  <BooksContainer
                    {...{ loading, error, books: booksToRender }}
                  />
                );
              }}
            </InfiniteScroll>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export { ShelfView };