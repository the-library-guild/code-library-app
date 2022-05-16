import React from 'react';
import { Stack } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../components/Content';
import { useUserInfo } from '../hooks/use-user-info.hook';
import { useUserBorrowedBooks } from '../hooks/use-borrowed-books.hook';
import { BooksContainer } from '../components/BooksContainer';
import { ResultsCount } from '../components/ResultsCount';

function ReturnBoxPage() {
  const { user } = useUserInfo();

  const { loading, error, books } = useUserBorrowedBooks(user.email);

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <ResultsCount count={books.length} text={'Books borrowed by you'} />
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <BooksContainer {...{ loading, error, books }} />
        </Stack>
      </Stack>
    </Content>
  );
}

ReturnBoxPage.permissions = Perm.MANAGE_BOOKS;

export default ReturnBoxPage;
