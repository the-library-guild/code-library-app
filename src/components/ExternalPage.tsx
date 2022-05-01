import React, { ReactNode } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

interface ExternalPageProps {
  children: ReactNode;
}

export function ExternalPage({ children }: ExternalPageProps) {
  return (
    <Flex
      minH={'100vh'}
      minW={'100vw'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      {children}
    </Flex>
  );
}
