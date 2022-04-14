import React from 'react';

import { Book } from './BookCard/BookCard.constants';
import { FullPageSpinner } from './FullPageSpinner';
import { BookCard } from './BookCard/BookCard';

interface BooksProps {
  loading: boolean;
  error: any;
  books: Book[];
}

export const BooksContainer = React.memo(function BooksContainer({
  loading,
  error,
  books,
}: BooksProps) {
  if (loading) return <FullPageSpinner />;
  if (error) return <Error error={error} />;
  if (books?.length === 0) return <EmptyShelf />;

  return (
    <>
      {books.map((book) => (
        <BookCard key={book?._id} book={book} />
      ))}
    </>
  );
});

function Error({ error }: { error: Error }) {
  return <div>{`Error! ${error.message}`}</div>;
}

function EmptyShelf() {
  return <div>We could not find any books :(</div>;
}
