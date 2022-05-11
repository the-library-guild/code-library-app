import React from 'react';
import NextLink from 'next/link';

import { Text, Link, useBreakpointValue } from '@chakra-ui/react';
import { SHELF } from '../../helpers/routes';

export function HomeLink() {
  const isNotMobile = useBreakpointValue({ base: false, md: true });
  return (
    <NextLink href={SHELF} passHref>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        {isNotMobile && (
          <Text as={'h2'} fontWeight={'bold'} fontSize={'2xl'}>
            Treedom Library
          </Text>
        )}
      </Link>
    </NextLink>
  );
}
