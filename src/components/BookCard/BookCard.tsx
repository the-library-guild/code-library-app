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

import { Book } from './BookCard.constants';
import { useBookState } from './use-book-state.hook';
import { useUserInfo } from '../../hooks/use-user-info.hook';
import { programAcronym } from './BookCard.helpers';

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
}
const BookCard = React.memo(function BookCard({
  book,
  isExpanded = false,
}: BookCardProps) {
  const userInfo = useUserInfo();

  const { label, color, hasAction, actionLabel, action } = useBookState(
    book,
    userInfo
  );
  const { name, media } = book;

  const handleClick = () =>
    action &&
    action().then(() =>
      window?.dispatchEvent(
        new CustomEvent('updateBookList', {
          bubbles: true,
          cancelable: true,
        })
      )
    );

  return (
    <Box
      as={'article'}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={3}
    >
      <Stat>
        <StatLabel>{programAcronym(media?.contentTags)}</StatLabel>
        <StatNumber>
          <NextLink
            href={{
              pathname: '/books/[id]',
              query: { id: book?._id },
            }}
            passHref
          >
            <Link
              style={{ textDecoration: 'none' }}
              _focus={{ boxShadow: 'none' }}
            >
              {name}
            </Link>
          </NextLink>
        </StatNumber>
        <StatHelpText>{media?.tagline}</StatHelpText>
        <StatHelpText color={color}>{label}</StatHelpText>
      </Stat>
      {isExpanded && (
        <Flex>
          <Spacer />
          {hasAction && (
            <Button marginLeft={'auto'} onClick={handleClick}>
              {actionLabel}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
});

export { BookCard };
