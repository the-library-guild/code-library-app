import React from 'react';

import { Book } from ".";

import { BookCard } from "./BookCard";

export function Booklist({ books }: { books: Book[] }) {
  return (
    <>
      {books && books.map((book: Book) => (
        <BookCard key={book._id} book={book} />
      ))}
      {books.length === 0 && (
        <div>Could not find any match :(</div>
      )}
    </>
  );
}
