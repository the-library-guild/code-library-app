import React, { ReactElement } from 'react';

import { Box, Flex, IconButton, useDisclosure } from '@chakra-ui/react';

import { Content } from './Content';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { ErrorBoundary } from './ErrorBoundary';
import {
  Header,
  HeaderLeftSideNode,
  HeaderRightSideNode,
} from './Sidebar/Header';
import { SidebarItem } from './Sidebar/SidebarItem';
import { FiBox, FiCompass, FiMenu, FiTrendingUp } from 'react-icons/fi';
import { useColorModeVariant } from '../hooks/use-color-mode-variant.hook';
import { BORROWED, RETURN_BOX, SHELF } from '../helpers/routes';

import { AppUser, LIBRARIAN_ROLE } from '../hooks/use-user-info.hook';
import { ToggleColorModeButton } from './ToggleColorMode';
import { UserDropdown } from './Sidebar/UserDropdown';
import { HomeLink } from './Sidebar/HomeLink';
interface InternalPageProps {
  children: ReactElement;
  user: AppUser;
}

export function InternalPage({ user, children }: InternalPageProps) {
  const lightOrDark = useColorModeVariant();

  const { isOpen, onClose, onOpen } = useDisclosure();

  const isLibrarian = user.role === LIBRARIAN_ROLE;

  return (
    <Flex as={'header'} w={'100vw'} h={'100vh'} direction={'column'}>
      <Box minH="100vh" bg={lightOrDark('white', 'gray.800')}>
        <Sidebar onClose={onClose} isOpen={isOpen}>
          {isLibrarian ? (
            <LibrarianOptions onClose={onClose} />
          ) : (
            <StudentsOptions onClose={onClose} />
          )}
        </Sidebar>
        <Header>
          <HeaderLeftSideNode>
            <IconButton
              display={'flex'}
              onClick={onOpen}
              variant="ghost"
              fontSize={'2xl'}
              aria-label={'open menu'}
              icon={<FiMenu />}
            />

            <HomeLink />
          </HeaderLeftSideNode>
          <HeaderRightSideNode>
            <ToggleColorModeButton />
            <UserDropdown user={user} />
          </HeaderRightSideNode>
        </Header>
        <Flex
          as={'main'}
          w={'100%'}
          align={'center'}
          justify={'center'}
          bg={lightOrDark('white', 'gray.800')}
        >
          <Content>
            <ErrorBoundary>
              {React.cloneElement(children, {
                ...children.props,
                user,
              })}
            </ErrorBoundary>
          </Content>
        </Flex>
      </Box>
    </Flex>
  );
}
interface SidebarOptionsProps {
  onClose: () => void;
}

export function StudentsOptions({ onClose }: SidebarOptionsProps) {
  return (
    <>
      <SidebarItem key={SHELF} icon={FiCompass} href={SHELF} onClose={onClose}>
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
    </>
  );
}

function LibrarianOptions({ onClose }: SidebarOptionsProps) {
  return (
    <>
      <SidebarItem key={SHELF} icon={FiCompass} href={SHELF} onClose={onClose}>
        Explore
      </SidebarItem>
      <SidebarItem
        key={RETURN_BOX}
        icon={FiBox}
        href={RETURN_BOX}
        onClose={onClose}
      >
        Return box
      </SidebarItem>
    </>
  );
}
