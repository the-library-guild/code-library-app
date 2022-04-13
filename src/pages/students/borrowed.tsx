import React, { useEffect, useState } from 'react';
import { Stack, Text } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../../components/Content';
import { useSearch } from '../../components/Search/use-search.hook';
import { SearchBox } from '../../components/Search/SearchBox';
import { useInterval } from '../../hooks/use-interval.hook';
import { useUserInfo } from '../../hooks/use-user-info.hook';
import { useUserBorrowedBooks } from '../../hooks/use-borrowed-books.hook';
import { BooksContainer } from '../../components/BooksContainer';

function BorrowedPage() {
  const { user } = useUserInfo();

  const { loading, error, books } = useUserBorrowedBooks(user.email);

  const { results, loadSearchResults, searchTerm, setSearchTerm } = useSearch();

  const [maxIdx, setMaxIdx] = useState(10);

  useInterval(() => {
    if (maxIdx > results.length && results.length !== 0) return;

    setMaxIdx((prev) => prev + 10);
  }, 500);

  useEffect(() => {
    loadSearchResults(books);
  }, [loading]);

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
        <Text fontSize={'sm'}>Books ({results.length})</Text>
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <BooksContainer {...{ loading, error, books: results, maxIdx }} />
        </Stack>
      </Stack>
    </Content>
  );
}

BorrowedPage.permissions = Perm.VIEW_BOOKS;

export default BorrowedPage;