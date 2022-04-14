import React from 'react';
import { Stack } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../../components/Content';
import { useUserInfo } from '../../hooks/use-user-info.hook';
import { useUserBorrowedBooks } from '../../hooks/use-borrowed-books.hook';
import { BooksContainer } from '../../components/BooksContainer';
import { ResultsCount } from '../../components/ResultsCount';

function BorrowedPage() {
  const { user } = useUserInfo();

  const { loading, error, books } = useUserBorrowedBooks(user.email);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <ResultsCount results={books} text={'Books borrowed by you'} />
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <BooksContainer {...{ loading, error, books }} />
        </Stack>
      </Stack>
    </Content>
  );
}

BorrowedPage.permissions = Perm.VIEW_BOOKS;

export default BorrowedPage;
