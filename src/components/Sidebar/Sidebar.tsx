import React, { PropsWithChildren, ReactNode } from 'react';

import NextLink from 'next/link';

import {
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Box,
  Flex,
  Link,
  Text,
  FlexProps,
  DrawerFooter,
  Button,
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
  return (
    <>
      <SidebarContent display={{ base: 'none', md: 'flex' }}>
        {children}
      </SidebarContent>
      <ColapsibleSidebar onClose={onClose} isOpen={isOpen}>
        {children}
      </ColapsibleSidebar>
    </>
  );
}

type SidebarContentProps = PropsWithChildren & FlexProps;

function SidebarContent({ children, ...rest }: SidebarContentProps) {
  const lightOrDark = useColorModeVariant();

  return (
    <Flex
      as={'nav'}
      transition={'.5s ease'}
      bg={lightOrDark('white', 'gray.900')}
      h={{ base: '100%', md: 'full' }}
      borderWidth={'1px'}
      direction={'column'}
      zIndex="sticky"
      alignItems={'start'}
      w={'100%'}
    >
      <Flex
        h={24}
        alignItems={'center'}
        justifyContent={'center'}
        p={8}
        mb={4}
        {...rest}
      >
        <NextLink href={SHELF} passHref>
          <Link
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
          >
            <Flex as={'h2'} gap={'2'} align={'center'}>
              <LibraryLogo height={'24'} />
              <Text fontSize={'2xl'} fontWeight={'semibold'}>
                Treedome Library
              </Text>
            </Flex>
          </Link>
        </NextLink>
      </Flex>
      {children}
    </Flex>
  );
}

function ColapsibleSidebar({ onClose, isOpen, children }: SidebarProps) {
  const lightOrDark = useColorModeVariant();

  return (
    <Box display={{ base: 'block', md: 'none' }}>
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
        <DrawerContent maxW={'80%'}>
          <SidebarContent>{children}</SidebarContent>
          <DrawerFooter
            bg={lightOrDark('white', 'gray.900')}
            display={'flex'}
            justifyContent={'center'}
            borderWidth={'1px'}
          >
            <Button variant={'ghost'} size={'sm'} onClick={onClose} w={'100%'}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
