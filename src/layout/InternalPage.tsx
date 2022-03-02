import { Flex, useColorModeValue } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { Navbar } from '../components/navigation/Navbar';
import { Content } from './Content';

interface InternalPageProps {
  children: ReactNode;
}

export function InternalPage({ children }: InternalPageProps) {
  return (
    <Flex
      as={"header"}
      w={"100vw"}
      h={"100vh"}
      m={"0"}
      direction={"column"}
    >
      <Navbar />
      <Flex
        as={"main"}
        w={"100%"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Content>
          {children}
        </Content>
      </Flex>
    </Flex>
  )
}
