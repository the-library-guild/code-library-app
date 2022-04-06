import React from 'react';
import Link from 'next/link';
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
} from '@chakra-ui/react';

import { Book } from '.';
import { useBookState } from './use-book-state.hook';
import { useUserInfo } from '../../hooks/use-user-info.hook';

const programAcronym = (contentTags: string[]) => contentTags[3];

interface BookCardProps {
  book: Book;
  isExpanded?: boolean;
}
export function BookCard({ book, isExpanded = false }: BookCardProps) {
  const userInfo = useUserInfo();

  const { label, color, hasAction, actionLabel, action } = useBookState(
    book,
    userInfo
  );
  const { name, media } = book;

  return (
    <Box
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'lg'}
      p={3}
    >
      <Stat>
        <StatLabel>
          {media?.contentTags ? programAcronym(media?.contentTags) : 'Unknown'}
        </StatLabel>
        <StatNumber>
          <Link href={`/books/${book?._id}`}>{name}</Link>
        </StatNumber>
        <StatHelpText>{media?.tagline}</StatHelpText>
        <StatHelpText color={color}>{label}</StatHelpText>
      </Stat>
      {isExpanded && (
        <Flex>
          <Spacer />
          {hasAction && (
            <Button
              marginLeft={'auto'}
              onClick={() =>
                action &&
                action().then(() =>
                  window?.dispatchEvent(
                    new CustomEvent('updateBookList', {
                      bubbles: true,
                      cancelable: true,
                    })
                  )
                )
              }
            >
              {actionLabel}
            </Button>
          )}
        </Flex>
      )}
    </Box>
  );
}
