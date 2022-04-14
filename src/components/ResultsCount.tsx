import { Text } from '@chakra-ui/react';
import React from 'react';

import { Book } from './BookCard/BookCard.constants';

type ResultsCountProps = {
  results: Book[];
  text: string;
};

export function ResultsCount({ results, text }: ResultsCountProps) {
  return (
    <Text p={1} fontWeight={'bold'} fontSize={'sm'}>
      {`${text} (${results.length})`}
    </Text>
  );
}
