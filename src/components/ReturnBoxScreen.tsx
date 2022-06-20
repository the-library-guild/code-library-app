import React, { useEffect } from 'react';

import { Stack } from '@chakra-ui/react';

import { ApolloError } from '@apollo/client';

import { useSearch } from '@/components/Search';
import { SearchBox } from '@/components/Search/SearchBox';
import { BooksContainer } from '@/components/BooksContainer';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { ResultsCount } from '@/components/ResultsCount';
import { Book } from '@/services/code-library-server/books';

type ReturnBoxScreenProps = {
  loading: boolean;
  error: ApolloError | undefined;
  books: Book[];
};

function ReturnBoxScreen({ loading, error, books }: ReturnBoxScreenProps) {
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
        <Stack spacing={4} width="100%">
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
          <Stack
            spacing={{ base: 4, md: 6 }}
            wordBreak="break-all"
            width="100%"
          >
            <InfiniteScroll results={results} loading={loading}>
              {({ booksToRender }) => {
                return (
                  <BooksContainer
                    withActions={true}
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

export { ReturnBoxScreen };
