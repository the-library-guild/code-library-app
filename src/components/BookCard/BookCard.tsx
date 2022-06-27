import React, { PropsWithChildren } from 'react';

import NextLink from 'next/link';

import { UrlObject } from 'url';

import {
  Flex,
  Text,
  useColorModeValue,
  Link,
  Heading,
  Stack,
  Badge,
} from '@chakra-ui/react';

import { useUserInfo } from '@/hooks/use-user-info.hook';
import { Book } from '@/services/code-library-server/books';
import { useBookState } from '.';
import { BorrowBookButton } from './BorrowBookButton';
import { BookLifeCycleContextProvider } from './BookLifeCycleContext';
import { ReturnBookButton } from './ReturnBookButton';
import { SortBookButton } from './SortBookButton';

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
}

export function BookCard({ book, isExpanded = false }: BookCardProps) {
  const userInfo = useUserInfo();

  const { label, color, hasAction, action } = useBookState(book, userInfo);

  const { bookingLimit } = userInfo.user;

  return (
    <Stack
      as={'article'}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={4}
      spacing={'2'}
    >
      <Flex justify={'space-between'} align={'center'}>
        <Heading fontSize={'xl'} noOfLines={1}>
          <NavigationLink
            href={{
              pathname: '/books/[id]',
              query: { id: book?.id },
            }}
          >
            {book.title}
          </NavigationLink>
        </Heading>
        <Badge colorScheme={'green'} variant={'outline'}>
          {book.designation}
        </Badge>
      </Flex>
      <Text noOfLines={[2, 1]} fontSize={'medium'}>
        {book.subTitle}
      </Text>
      <Flex align={'center'} justify={'space-between'} pt={6}>
        <Text py={2} color={color} fontWeight={'semibold'}>
          {label}
        </Text>
        {isExpanded && hasAction && (
          <>
            <BookLifeCycleContextProvider bookingLimit={bookingLimit}>
              <ActionButton action={action} bookId={book?.id} />
            </BookLifeCycleContextProvider>
          </>
        )}
      </Flex>
    </Stack>
  );
}

function NavigationLink({
  href,
  children,
}: PropsWithChildren<{ href: string | UrlObject }>) {
  return (
    <NextLink href={href} passHref>
      <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
        {children}
      </Link>
    </NextLink>
  );
}

function ActionButton({ action, bookId }: { action: string; bookId: string }) {
  if (action === 'Borrow') {
    return <BorrowBookButton bookId={bookId} />;
  }

  if (action === 'Return') {
    return <ReturnBookButton bookId={bookId} />;
  }

  if (action === 'Return to Shelf') {
    return <SortBookButton bookId={bookId} />;
  }

  return null;
}
