import React, { ReactNode } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { Content } from './Content';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from './ErrorBoundary';

interface InternalPageProps {
  children: ReactNode;
}

export function InternalPage({ children }: InternalPageProps) {
  return (
    <Flex as={'header'} w={'100vw'} h={'100vh'} m={'0'} direction={'column'}>
      <Sidebar>
        <Flex
          as={'main'}
          w={'100%'}
          align={'center'}
          justify={'center'}
          bg={useColorModeValue('white', 'gray.800')}
        >
          <Content>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Content>
        </Flex>
      </Sidebar>
    </Flex>
  );
}
