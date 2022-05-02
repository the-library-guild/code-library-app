import React, { ReactNode } from 'react';

import NextLink from 'next/link';

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Box,
  Flex,
  Link,
  Text,
} from '@chakra-ui/react';

import { LibraryLogo } from '../LibraryLogo';
import { useColorModeVariant } from '../../hooks/use-color-mode-variant.hook';
import { SHELF } from '../../helpers/routes';

interface SidebarProps {
  onClose: any;
  isOpen: boolean;
  children: ReactNode;
}

export function Sidebar({ onClose, isOpen, children }: SidebarProps) {
  const lightOrDark = useColorModeVariant();

  return (
    <Drawer
      autoFocus={false}
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      returnFocusOnClose={false}
      closeOnOverlayClick
      size={'xs'}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box
          transition="3s ease"
          bg={lightOrDark('white', 'gray.900')}
          borderRight="1px"
          borderRightColor={lightOrDark('gray.200', 'gray.700')}
          w={'full'}
          pos="fixed"
          h="full"
        >
          <Flex
            h="20"
            alignItems="center"
            mx="8"
            justifyContent="space-between"
          >
            <NextLink href={SHELF} passHref>
              <Link
                style={{ textDecoration: 'none' }}
                _focus={{ boxShadow: 'none' }}
                onClick={onClose}
              >
                <Flex
                  as={'h2'}
                  fontWeight={'bold'}
                  gap={'2'}
                  alignItems={'center'}
                >
                  <LibraryLogo height={'24'} />
                  <Text fontSize={'2xl'}>Treedom Library</Text>
                </Flex>
              </Link>
            </NextLink>
          </Flex>
          {children}
        </Box>
      </DrawerContent>
    </Drawer>
  );
}
