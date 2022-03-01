import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Navbar } from '../components/Navbar';

interface InternalPageLayoutProps {
  children: ReactNode;
}

export function InternalPageLayout({ children }: InternalPageLayoutProps) {
  return (
    <Flex
      as="header"
      w="100vw"
      h="100vh"
      m="0"
      direction="column"
    >
      <Navbar />
      <Flex maxW="1480px">
        {children}
      </Flex>
    </Flex>
  )
}
