import React, { PropsWithChildren, useState } from 'react';

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
import { BorrowBookButton, BorrowingInstructions } from './BorrowBookButton';
import { ReturnBookButton, ReturnInstructions } from './ReturnBookButton';
import { BookSortedConfirmation, SortBookButton } from './SortBookButton';
import { ActionStatusDialog } from './ActionStatusDialog';

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
}

type Error = { title: string; description: string };

function useActionInstructions() {
  const [showInstructionsFor, setShowInstructionsFor] = useState<string | null>(
    null
  );
  const [error, setError] = useState<Error | undefined>(undefined);

  const setInstructionsFor = (action: string) => () => {
    setShowInstructionsFor(action);
  };

  const cleanup = () => {
    setShowInstructionsFor(null);
    setError(undefined);
  };

  return { showInstructionsFor, setInstructionsFor, setError, error, cleanup };
}

export function BookCard({ book, isExpanded = false }: BookCardProps) {
  const userInfo = useUserInfo();

  const { label, color, hasAction, action } = useBookState(book, userInfo);

  const { bookingLimit } = userInfo.user;

  const { showInstructionsFor, setInstructionsFor, setError, error, cleanup } =
    useActionInstructions();

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
        <ActionInstructions
          showInstructionsFor={showInstructionsFor}
          error={error}
          cleanup={cleanup}
        />
        {isExpanded && hasAction && (
          <>
            <ActionButton
              action={action}
              bookId={book?.id}
              setError={setError}
              setInstructionsFor={setInstructionsFor}
            />
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

function ActionButton({
  action,
  bookId,
  setInstructionsFor,
  setError,
}: {
  action: string;
  bookId: string;
  setInstructionsFor: (action: string) => () => any;
  setError: (error: Error) => any;
}) {
  if (action === 'Borrow') {
    return (
      <>
        <BorrowBookButton
          bookId={bookId}
          onError={setError}
          onCompleted={setInstructionsFor('Borrow')}
        />
      </>
    );
  }

  if (action === 'Return') {
    return (
      <>
        <ReturnBookButton
          bookId={bookId}
          onError={setError}
          onCompleted={setInstructionsFor('Return')}
        />
      </>
    );
  }

  if (action === 'Return to Shelf') {
    return (
      <>
        <SortBookButton
          bookId={bookId}
          onError={setError}
          onCompleted={setInstructionsFor('Return to Shelf')}
        />
      </>
    );
  }

  return null;
}

function ActionInstructions({ showInstructionsFor, error, cleanup }) {
  if (error) {
    return (
      <ActionStatusDialog
        show={true}
        loading={false}
        error={error}
        onEnd={cleanup}
        onSuccess={<></>}
      />
    );
  }

  if (showInstructionsFor === 'Borrow') {
    return (
      <ActionStatusDialog
        show={showInstructionsFor === 'Borrow'}
        loading={false}
        error={false}
        onEnd={cleanup}
        onSuccess={<BorrowingInstructions />}
      />
    );
  }

  if (showInstructionsFor === 'Return') {
    return (
      <ActionStatusDialog
        show={showInstructionsFor === 'Return'}
        loading={false}
        error={false}
        onEnd={cleanup}
        onSuccess={<ReturnInstructions />}
      />
    );
  }

  if (showInstructionsFor === 'Return to Shelf') {
    return (
      <ActionStatusDialog
        show={showInstructionsFor === 'Return to Shelf'}
        loading={false}
        error={false}
        onEnd={cleanup}
        onSuccess={<BookSortedConfirmation />}
      />
    );
  }

  return null;
}
