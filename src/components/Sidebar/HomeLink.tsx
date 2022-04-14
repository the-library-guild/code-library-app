import React from 'react';
import NextLink from 'next/link';

import { Text, Link } from '@chakra-ui/react';

export function HomeLink() {
  return (
    <NextLink href={'/'} passHref>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        <Text as={'h2'} fontWeight={'bold'} fontSize={'2xl'}>
          Treedom Library
        </Text>
      </Link>
    </NextLink>
  );
}
