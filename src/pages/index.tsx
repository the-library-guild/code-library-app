import React, { useEffect, useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../components/Content';
import { useSearch } from '../components/Search/use-search.hook';
import { SearchBox } from '../components/Search/SearchBox';
import { GET_SHELF } from '../queries/queries';
import { useInterval } from '../hooks/use-interval.hook';
import { useBookContainer } from '../components/BookCard/use-book-container.hook';
import { BooksContainer } from '../components/BooksContainer';

function IndexPage() {
  const [maxIdx, setMaxIdx] = useState(10);
  const { loading, error, books } = useBookContainer(GET_SHELF);
  const { results, loadSearchResults, searchTerm, setSearchTerm } = useSearch();

  useInterval(() => {
    if (maxIdx > results.length && results.length !== 0) return;

    setMaxIdx((prev) => prev + 10);
  }, 500);

  useEffect(() => {
    loadSearchResults(books);
  }, [loading, books]);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <SearchBox
          searchTerm={searchTerm}
          setSearchTerm={(term: string) => {
            setMaxIdx(10);
            setSearchTerm(term);
          }}
        />
        {!loading && <Text fontSize={'sm'}>Results ({results.length})</Text>}
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <BooksContainer {...{ loading, error, books: results, maxIdx }} />
        </Stack>
      </Stack>
    </Content>
  );
}

IndexPage.permissions = Perm.VIEW_BOOKS;

export default IndexPage;
