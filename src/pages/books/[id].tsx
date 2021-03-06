import React from 'react';

import { useRouter } from 'next/router';

import { useQuery } from '@apollo/client';

import { Perm } from 'code-library-perms';

import { GET_BOOK } from '@/services/code-library-server/queries';

import { toSchema } from '@/services/code-library-server/books';

import { BookDetailsScreen } from '@/components/BookDetailsScreen/BookDetailsScreen';

function BookDetailedPage() {
  const { query, back } = useRouter();

  const bookId = query.id as string;

  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: { bookId },
  });

  const book = toSchema(data?.getBook);

  return (
    <BookDetailsScreen
      onClickBack={back}
      loading={loading}
      error={error}
      book={book}
    />
  );
}
BookDetailedPage.permissions = Perm.VIEW_BOOKS;
BookDetailedPage.title = 'Details';

export default BookDetailedPage;
