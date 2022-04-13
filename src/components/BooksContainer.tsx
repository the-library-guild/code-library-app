import React from 'react';

import { Book } from './BookCard/BookCard.constants';
import { FullPageSpinner } from './FullPageSpinner';
import { BookCard } from './BookCard/BookCard';

interface BooksProps {
  loading: boolean;
  error: any;
  books: Book[];
  maxIdx: number;
}

export function BooksContainer({ loading, error, books, maxIdx }: BooksProps) {
  if (loading) return <FullPageSpinner />;
  if (error) return <div>{`Error! ${error.message}`}</div>;
  if (!books?.length) return <div>Could not find any books :(</div>;

  return (
    <>
      {books.slice(0, maxIdx).map((book) => (
        <BookCard key={book?._id} book={book} />
      ))}
    </>
  );
}
