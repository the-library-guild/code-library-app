import React, { ReactElement } from 'react';

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

import { FiBox, FiCompass, FiMenu, FiTrendingUp } from 'react-icons/fi';

import {
  Header,
  HeaderLeftSideNode,
  HeaderRightSideNode,
  UserDropdown,
  HomeLink,
  Sidebar,
  SidebarItem,
} from '@/components/Sidebar';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Content } from '@/components/Content';
import { ToggleColorModeButton } from '@/components/ToggleColorMode';
import {
  NewBookFormDialog,
  NewBookFormDialogButton,
} from '@/components/NewBookForm';

import { BORROWED, RETURN_BOX, SHELF } from '@/helpers/routes';

import { useColorModeVariant } from '@/hooks/use-color-mode-variant.hook';
import { AppUser, LIBRARIAN_ROLE } from '@/hooks/use-user-info.hook';

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

  const isLibrarian = user.role === LIBRARIAN_ROLE;

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
              <NewBookFormDialog>
                <NewBookFormDialogButton>
                  + Add new book
                </NewBookFormDialogButton>
              </NewBookFormDialog>
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
