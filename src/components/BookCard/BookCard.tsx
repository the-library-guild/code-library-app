import React from 'react';
import NextLink from 'next/link';
import {
  Flex,
  Text,
  Button,
  useColorModeValue,
  Link,
  Heading,
  Stack,
  Badge,
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
    <Stack
      as={'article'}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'dark-lg'}
      p={4}
      spacing={'2'}
      maxW={900}
    >
      <Flex justify={'space-between'} align={'center'}>
        <Heading fontSize={'xl'}>
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
        </Heading>
        <Badge colorScheme={'green'} variant={'outline'}>
          {book.designation}
        </Badge>
      </Flex>
      <Text noOfLines={[2, 1]} fontSize={'medium'}>
        {book.subTitle}
      </Text>
      <Flex align={'center'} justify={'space-between'} pt={6}>
        <Text py={2} color={color}>
          {label}
        </Text>
        {isExpanded && hasAction && (
          <>
            <Button onClick={action}>{actionLabel}</Button>
          </>
        )}
      </Flex>
    </Stack>
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
