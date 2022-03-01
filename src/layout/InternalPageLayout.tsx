import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
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
      <Flex
        w={"100%"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Flex maxW={"1480"} m={"0 auto"}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
}
