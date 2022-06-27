import React, { PropsWithChildren, ReactElement } from 'react';

import {
  Flex,
  IconButton,
  useDisclosure,
  MenuItem,
  Grid,
  GridItem,
  Text,
} from '@chakra-ui/react';

import { signOut } from 'next-auth/react';

import { FaSignOutAlt } from 'react-icons/fa';

import { FiBox, FiCompass, FiMenu, FiTrendingUp } from 'react-icons/fi';

import {
  Header,
  HeaderLeftSideNode,
  HeaderRightSideNode,
  UserDropdown,
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

interface SidebarOptionsProps {
  onClose: () => void;
  isLibrarian: boolean;
}

export function SidebarOptions({ onClose, isLibrarian }: SidebarOptionsProps) {
  return (
    <>
      <Grid
        minW={'100%'}
        maxH={'100%'}
        templateRows="repeat(12, 1fr)"
        templateColumns="repeat(1, 1fr)"
      >
        <GridItem rowSpan={10}>
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
          <LibrariansOnly isLibrarian={isLibrarian}>
            <SidebarItem
              key={RETURN_BOX}
              icon={FiBox}
              href={RETURN_BOX}
              onClose={onClose}
            >
              Return box
            </SidebarItem>
          </LibrariansOnly>
        </GridItem>
        <LibrariansOnly isLibrarian={isLibrarian}>
          <GridItem rowSpan={2}>
            <Flex
              direction={'column'}
              px={12}
              align={'center'}
              justify={'start'}
              maxH={'100%'}
            >
              <NewBookFormDialog>
                <NewBookFormDialogButton w={'100%'}>
                  Add new book
                </NewBookFormDialogButton>
              </NewBookFormDialog>
            </Flex>
          </GridItem>
        </LibrariansOnly>
      </Grid>
    </>
  );
}

function LibrariansOnly({
  isLibrarian,
  children,
}: PropsWithChildren<{ isLibrarian: boolean }>) {
  return <>{isLibrarian && children}</>;
}

function PageTitle({ title }) {
  return (
    <Text as={'h2'} fontWeight={'medium'} fontSize={'xl'}>
      {title}
    </Text>
  );
}

function InternalPageLayout({ children }) {
  return (
    <Grid
      maxW={'100%'}
      h={'100vh'}
      templateRows="repeat(12, 1fr)"
      templateColumns="repeat(5, 1fr)"
    >
      {children}
    </Grid>
  );
}

function HeaderSection({ children }) {
  return (
    <GridItem colSpan={{ base: 5, lg: 4 }} rowSpan={1}>
      {children}
    </GridItem>
  );
}

function SidebarSection({ children }) {
  return (
    <GridItem
      rowSpan={12}
      colSpan={1}
      minW={300}
      display={{ base: 'none', lg: 'grid' }}
    >
      {children}
    </GridItem>
  );
}

function ContentSection({ children }) {
  const lightOrDark = useColorModeVariant();

  return (
    <GridItem
      minH={'100vh'}
      colSpan={{ base: 5, lg: 4 }}
      rowSpan={{ base: 11, lg: 11 }}
      bg={lightOrDark('gray.50', 'gray.800')}
      scrollBehavior={'smooth'}
      overflowY={'scroll'}
      css={{
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'var(--chakra-colors-whiteAlpha-700)',
          borderRadius: '12px',
        },
      }}
    >
      <Flex
        as={'main'}
        w={'100%'}
        p={{ base: 4, md: 8 }}
        justify={'center'}
        transition="1s ease"
      >
        <Content>
          <ErrorBoundary>{children}</ErrorBoundary>
        </Content>
      </Flex>
    </GridItem>
  );
}

type InternalPageProps = {
  user: AppUser;
  title?: string;
  children: ReactElement;
};

export function InternalPage({
  user,
  title = 'Shelf',
  children,
}: InternalPageProps) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const isLibrarian =
    user.role === LIBRARIAN_ROLE ||
    user.email === 'marcelo.teixeira@code.berlin';

  return (
    <InternalPageLayout>
      <SidebarSection>
        <Sidebar onClose={onClose} isOpen={isOpen}>
          <SidebarOptions onClose={onClose} isLibrarian={isLibrarian} />
        </Sidebar>
      </SidebarSection>
      <HeaderSection>
        <Header transition=".5s ease">
          <HeaderLeftSideNode justifyContent={'start'} w={'100%'}>
            <IconButton
              display={{ base: 'inline-flex', lg: 'none' }}
              onClick={onOpen}
              variant="ghost"
              fontSize={'2xl'}
              aria-label={'open menu'}
              icon={<FiMenu />}
            />
            <PageTitle title={title} />
          </HeaderLeftSideNode>
          <HeaderRightSideNode w={'100%'} justifyContent={'end'}>
            <ToggleColorModeButton />
            <UserDropdown user={user}>
              <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut()}>
                Logout
              </MenuItem>
            </UserDropdown>
          </HeaderRightSideNode>
        </Header>
      </HeaderSection>
      <ContentSection>
        {React.cloneElement(children, {
          ...children.props,
          user,
        })}
      </ContentSection>
    </InternalPageLayout>
  );
}
