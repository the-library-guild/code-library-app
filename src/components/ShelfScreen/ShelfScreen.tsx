import React, { useEffect } from 'react';

import { Stack } from '@chakra-ui/react';

import { ApolloError } from '@apollo/client';

import { useSearch } from '@/components/Search';
import { SearchBox } from '@/components/Search/SearchBox';
import { BooksContainer } from '@/components/BooksContainer';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { ResultsCount } from '@/components/ResultsCount';
import { Book } from '@/services/code-library-server/books';

type ShelfScreenProps = {
  loading: boolean;
  error: ApolloError | undefined;
  books: Book[];
};

function ShelfScreen({ loading, error, books }: ShelfScreenProps) {
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
          <InfiniteScroll results={results} loading={loading}>
            {({ booksToRender }) => {
              return (
                <BooksContainer {...{ loading, error, books: booksToRender }} />
              );
            }}
          </InfiniteScroll>
        </Stack>
      </Stack>
    </>
  );
}

export { ShelfScreen };
