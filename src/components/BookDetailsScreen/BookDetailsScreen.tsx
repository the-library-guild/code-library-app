import React from 'react';

import { Button, Spinner, Stack, useColorModeValue } from '@chakra-ui/react';

import { BookCard } from '@/components/BookCard/BookCard';
import { Suspense } from '@/components/Suspense';

function Loading() {
  return (
    <Spinner
      alignSelf={'center'}
      thickness="4px"
      speed="0.65s"
      color={useColorModeValue('gray.600', 'gray.300')}
      size="xl"
    />
  );
}

export function BookDetailsScreen({ onClickBack, loading, error, book }) {
  return (
    <Stack spacing={6} wordBreak="break-all" width="100%">
      <Button
        variant={'outline'}
        fontWeight={'semibold'}
        fontSize={'lg'}
        rounded={'lg'}
        size={'lg'}
        color={useColorModeValue('gray.800', 'white')}
        w={8}
        onClick={onClickBack}
      >
        ←
      </Button>
      <Suspense
        loading={loading}
        error={error}
        fallback={<Loading />}
        onErrorMessage={'Could not find requested book'}
      >
        <BookCard book={book} isExpanded={true} />
      </Suspense>
    </Stack>
  );
}

export default BookDetailsScreen;
