import React from 'react';

import { Text } from '@chakra-ui/react';

type ResultsCountProps = {
  count: number;
  text: string;
};

export function ResultsCount({ count, text }: ResultsCountProps) {
  return (
    <Text p={1} fontWeight={'bold'} fontSize={'sm'}>
      {`${text} (${count})`}
    </Text>
  );
}
