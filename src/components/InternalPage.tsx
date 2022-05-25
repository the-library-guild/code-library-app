import React, { ReactElement, useEffect } from 'react';

import {
  Box,
  Flex,
  IconButton,
  useDisclosure,
  MenuItem,
  Heading,
} from '@chakra-ui/react';

import { signOut } from 'next-auth/react';

import { FaSignOutAlt } from 'react-icons/fa';

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
import {
  AddNewBookModal,
  AddNewBookModalButton,
} from './AddNewBookModal/AddNewBookModal';
import CodeLibraryServer, { GET_SHELF } from '@/services/code-library-server';

interface InternalPageProps {
  children: ReactElement;
  title?: string;
  user: AppUser;
}

export function InternalPage({
  user,
  title = 'Shelf',
  children,
}: InternalPageProps) {
  const lightOrDark = useColorModeVariant();

  const { isOpen, onClose, onOpen } = useDisclosure();

  console.log('authUser', user);

  const isLibrarian = user.role === LIBRARIAN_ROLE;

  useEffect(() => {
    async function loadWorker() {
      const worker = (await import('../mocks/browser')).worker;
      worker.start();
    }
    if (process.env.NODE_ENV === 'development') {
      loadWorker();
    }

    CodeLibraryServer.refetchQueries({ include: [GET_SHELF] });
  }, []);

  const onSubmit = () => {
    return new Promise((resolve) => setTimeout(resolve, 5000));
  };

  return (
    <Flex
      as={'header'}
      w={'100vw'}
      maxW={'100%'}
      h={'100vh'}
      direction={'column'}
    >
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
            <UserDropdown user={user}>
              <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut()}>
                Logout
              </MenuItem>
              <ToggleColorModeButton
                position={'absolute'}
                top={0}
                right={0}
                p={6}
              />
            </UserDropdown>
          </HeaderRightSideNode>
        </Header>
        <Header border={'none'} bg={'none'}>
          <HeaderLeftSideNode>
            <Heading fontSize={'2xl'} fontWeight={'normal'}>
              {title}
            </Heading>
          </HeaderLeftSideNode>
          <HeaderRightSideNode>
            {isLibrarian && (
              <AddNewBookModal onSubmit={onSubmit}>
                <AddNewBookModalButton>+ Add new book</AddNewBookModalButton>
              </AddNewBookModal>
            )}
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
