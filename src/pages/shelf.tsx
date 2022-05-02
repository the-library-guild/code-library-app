import React, { useEffect, useRef } from 'react';

import { Stack } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';
import { Content } from '../components/Content';
import { useSearch } from '../components/Search/use-search.hook';
import { SearchBox } from '../components/Search/SearchBox';
import { BooksContainer } from '../components/BooksContainer';
import { InfiniteScroll } from '../components/InfiniteScroll';
import { ResultsCount } from '../components/ResultsCount';
import { Book } from '../services/code-library-server/books';
import { useShelf } from '../hooks/use-shelf.hook';
function ShelfPage() {
  const { results, ...search } = useSearch();
  const { loading, error, books } = useShelf();

  // Avoids rerenders with similar results
  const lastBooks = useRef<Book[]>([]);

  useEffect(() => {
    if (loading) {
      return;
    }

    if (lastBooks.current.length === books.length) {
      return;
    }

    lastBooks.current = books;

    search.setInitialResults(books);
  }, [books, loading, search]);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <SearchBox
          searchTerm={search.searchTerm}
          setSearchTerm={search.setSearchTerm}
        />
        {!loading && (
          <ResultsCount
            results={results}
            text={search.searchTerm ? 'Results' : 'Books in the shelf'}
          />
        )}
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <InfiniteScroll results={results} loading={loading}>
            {({ booksToRender }) => {
              return (
                <BooksContainer {...{ loading, error, books: booksToRender }} />
              );
            }}
          </InfiniteScroll>
        </Stack>
      </Stack>
    </Content>
  );
}

ShelfPage.permissions = Perm.VIEW_BOOKS;

export default ShelfPage;
