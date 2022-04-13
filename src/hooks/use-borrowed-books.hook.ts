import { useQuery } from '@apollo/client';

import { Book } from '../components/BookCard/BookCard.constants';
import { GET_USER_BOOKS } from '../queries/queries';

interface getBooksResponse {
  getUser: {
    children: Book[];
  };
}

const shorten = (str: string, maxLength: number): string => {
  if (!str) return '';
  return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

export function useUserBorrowedBooks(email: string) {
  const { loading, error, data, refetch } = useQuery<getBooksResponse>(
    GET_USER_BOOKS,
    {
      ...{ variables: { email } },
      returnPartialData: true,
    }
  );

  const childrenList = (data?.getUser?.children ?? []) as Book[];

  const books = childrenList.map((book) => ({
    ...book,
    media: {
      ...book.media,
      tagline: shorten(book.media.tagline, 100),
    },
  }));
  return { loading, error, books, refetch };
}
