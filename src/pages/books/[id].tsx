import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';

import { Perm } from 'code-library-perms';

import { GET_BOOK } from '@/services/code-library-server/queries';

import { Content } from '@/components/Content';
import { BookCard } from '@/components/BookCard/BookCard';
import { Suspense } from '@/components/Suspense';
import { toSchema } from '@/services/code-library-server/books';

function BookDetailedPage() {
  const { query } = useRouter();

  const bookId = query.id as string;

  const { loading, error, data, refetch } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  const book = toSchema(data?.getBook);

  useEffect(() => {
    function refetchBookList() {
      refetch();
    }

    window.addEventListener('updateBookList', refetchBookList);

    return () => window.removeEventListener('updateBookList', refetchBookList);
  }, [refetch]);

  return (
    <Content>
      <Stack spacing={6} wordBreak="break-all" width="100%">
        <Suspense
          loading={loading}
          error={error}
          onErrorMessage={'Could not find requested book'}
        >
          <BookCard book={book} isExpanded={true} />
        </Suspense>
      </Stack>
    </Content>
  );
}
BookDetailedPage.permissions = Perm.VIEW_BOOKS;

export default BookDetailedPage;
