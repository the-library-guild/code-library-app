import React from 'react';

import { Perm } from 'code-library-perms';
import { useShelf } from '@/hooks/use-shelf.hook';
import { ShelfScreen } from '@/components/ShelfScreen';
import { Book } from '@/services/code-library-server';

const text = (text: string) => ({
  includes: (match: string) => text === match,
});
function ShelfPage() {
  const { loading, error, books } = useShelf();

  const byProcessingStatus = (book: Book) =>
    text(book.status).includes('Available');

  const booksOnTheShelf = books.filter(byProcessingStatus);

  return (
    <ShelfScreen loading={loading} error={error} books={booksOnTheShelf} />
  );
}

ShelfPage.title = 'Shelf';
ShelfPage.permissions = Perm.VIEW_BOOKS;

export default ShelfPage;
