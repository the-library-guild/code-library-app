import React, { ReactNode } from 'react';

import { Box, Flex, useDisclosure } from '@chakra-ui/react';

import { Content } from './Content';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from './ErrorBoundary';
import { Header } from './Sidebar/Header';
import { SidebarItem } from './Sidebar/SidebarItem';
import { FiCompass, FiTrendingUp } from 'react-icons/fi';
import { useColorModeVariant } from '../hooks/use-color-mode-variant.hook';
import { BORROWED, SHELF } from '../routes';

export function StudentsView({ children }: { children: ReactNode }) {
  const lightOrDark = useColorModeVariant();

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex as={'header'} w={'100vw'} h={'100vh'} m={'0'} direction={'column'}>
      <Box minH="100vh" bg={lightOrDark('white', 'gray.800')}>
        <Sidebar onClose={onClose} isOpen={isOpen}>
          <SidebarItem
            key={SHELF}
            icon={FiCompass}
            href={SHELF}
            onClose={onClose}
          >
            Explore
          </SidebarItem>
          <SidebarItem
            key={BORROWED}
            icon={FiTrendingUp}
            href={BORROWED}
            onClose={onClose}
          >
            Books you borrowed
          </SidebarItem>
        </Sidebar>
        <Header onOpen={onOpen} />
        <Flex
          as={'main'}
          w={'100%'}
          align={'center'}
          justify={'center'}
          bg={lightOrDark('white', 'gray.800')}
        >
          <Content>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Content>
        </Flex>
      </Box>
    </Flex>
  );
}
