import React from 'react';

import { BookCard } from './BookCard/BookCard';
import { Suspense } from './Suspense';
import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';

import { Book } from '@/services/code-library-server/books';

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
  const noBooksOnShelf = books?.length === 0;

  return (
    <Suspense
      loading={loading}
      error={error}
      onErrorMessage={error?.message}
      fallback={<LocalSpinner />}
    >
      {books.map((book) => (
        <BookCard key={book?.id} book={book} />
      ))}
      {noBooksOnShelf && <EmptyShelf />}
    </Suspense>
  );
});

function EmptyShelf() {
  return <div>We could not find any books :(</div>;
}

function LocalSpinner() {
  return (
    <Flex
      justify={'center'}
      align={'center'}
      height={{ base: '80vw', lg: '40vw' }}
      flex={'1 1 auto'}
      flexDir={'column'}
      flexGrow={1}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        color={useColorModeValue('gray.600', 'gray.300')}
        size="xl"
      />
    </Flex>
  );
}
