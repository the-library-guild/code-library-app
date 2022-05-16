import React from 'react';
import NextLink from 'next/link';
import {
  Box,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Stat,
  StatLabel,
  StatHelpText,
  StatNumber,
  Link,
} from '@chakra-ui/react';

import { useBookState } from '.';
import { useUserInfo } from '../../hooks/use-user-info.hook';
import { Book } from '@/services/code-library-server/books';

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
  label: string;
  color: string;
  hasAction: boolean;
  actionLabel: string;
  action: any;
}
const BookCard = function BookCard({
  book,
  isExpanded = false,
  label,
  color,
  hasAction,
  actionLabel,
  action,
}: BookCardProps) {
  return (
    <Box
      as={'article'}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={3}
    >
      <Stat>
        <StatLabel>{book.designation}</StatLabel>
        <StatNumber>
          <NextLink
            href={{
              pathname: '/books/[id]',
              query: { id: book?.id },
            }}
            passHref
          >
            <Link
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              {book.title}
            </Link>
          </NextLink>
        </StatNumber>
        <StatHelpText>{book.subTitle}</StatHelpText>
        <StatHelpText color={color}>{label}</StatHelpText>
      </Stat>
      {isExpanded && (
        <Flex>
          <Spacer />
          {hasAction && (
            <Button marginLeft={'auto'} onClick={action}>
              {actionLabel}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
};

interface BookCardLoaderProps {
  book: Book;
  isExpanded?: boolean;
}

const BookCardLoader = ({ book, isExpanded = false }: BookCardLoaderProps) => {
  const userInfo = useUserInfo();

  const { label, color, hasAction, actionLabel, action } = useBookState(
    book,
    userInfo
  );

  return (
    <BookCard
      book={book}
      isExpanded={isExpanded}
      label={label}
      color={color}
      hasAction={hasAction}
      actionLabel={actionLabel}
      action={action}
    />
  );
};

export { BookCardLoader as BookCard, BookCard as BookCardComponent };
