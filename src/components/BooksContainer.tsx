import React from 'react';

import { BookCard } from './BookCard/BookCard';
import { Suspense } from './Suspense';
import { Flex, Spinner, Stack, useColorModeValue } from '@chakra-ui/react';

import { Book } from '@/services/code-library-server/books';

interface BooksProps {
  loading: boolean;
  error: any;
  books: Book[];
  withActions?: boolean;
}

export const BooksContainer = React.memo(function BooksContainer({
  loading,
  error,
  books,
  withActions = false,
}: BooksProps) {
  const noBooksOnShelf = books?.length === 0;

  return (
    <Suspense
      loading={loading}
      error={error}
      onErrorMessage={error?.message}
      fallback={<LocalSpinner />}
    >
      <Stack
        spacing={{ base: 4, md: 6 }}
        wordBreak="break-all"
        width="100%"
        scrollBehavior={'smooth'}
        overflowY={'scroll'}
        css={{
          '&::-webkit-scrollbar': {
            appearance: 'none',
          },
        }}
      >
        {books.map((book) => (
          <BookCard key={book?.id} book={book} isExpanded={withActions} />
        ))}
        {noBooksOnShelf && <EmptyShelf />}
      </Stack>
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
