import React from 'react';

import { Text, Link } from '@chakra-ui/react';

export function HomeLink() {
  return (
    <Link
      href="/"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Text as={'h2'} fontWeight={'bold'} fontSize={'2xl'}>
        CODE Library
      </Text>
    </Link>
  );
}
