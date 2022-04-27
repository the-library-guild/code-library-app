import React, { useEffect } from 'react';
import { Stack } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../components/Content';
import { useSearch } from '../components/Search/use-search.hook';
import { SearchBox } from '../components/Search/SearchBox';
import { GET_SHELF } from '../queries/queries';
import { useBookContainer } from '../components/BookCard/use-book-container.hook';
import { BooksContainer } from '../components/BooksContainer';
import { InfiniteScroll } from '../components/InfiniteScroll';
import { ResultsCount } from '../components/ResultsCount';
function IndexPage() {
  const { loading, error, books } = useBookContainer(GET_SHELF);
  const { results, setInitialResults, searchTerm, setSearchTerm } = useSearch();

  useEffect(() => {
    if (loading) return;
    setInitialResults(books);
  }, [loading]);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        {!loading && (
          <ResultsCount
            results={results}
            text={searchTerm ? 'Results' : 'Books in the shelf'}
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

IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;
