import React from 'react';

import { Perm } from 'code-library-perms';
import { useShelf } from '@/hooks/use-shelf.hook';
import { Book } from '@/services/code-library-server';
import { ReturnBoxScreen } from '@/components/ReturnBoxScreen';

const text = (text: string) => ({
  includes: (match: string) => text === match,
});
function ReturnBoxPage() {
  const { loading, error, books } = useShelf();

  const byProcessingStatus = (book: Book) =>
    text(book.status).includes('Processing');

  const booksOnReturnBox = books.filter(byProcessingStatus);

  return (
    <ReturnBoxScreen loading={loading} error={error} books={booksOnReturnBox} />
  );
}

ReturnBoxPage.title = 'ReturnBox';
ReturnBoxPage.permissions = Perm.MANAGE_BOOKS;

export default ReturnBoxPage;
