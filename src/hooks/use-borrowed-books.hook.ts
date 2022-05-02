import { useQuery } from '@apollo/client';
import { useEffect } from 'react';

import { Book } from '../components/BookCard/BookCard.constants';
import { GET_USER_BOOKS } from '../services/code-library-server/queries';
import { fromResponse } from '../services/code-library-server/books';

interface getBooksResponse {
  getUser: {
    childrenIds: string[];
    children: Book[];
  };
}

export function useUserBorrowedBooks(email: string) {
  const { loading, error, data, refetch } = useQuery<getBooksResponse>(
    GET_USER_BOOKS,
    {
      variables: { email },
      returnPartialData: true,
      notifyOnNetworkStatusChange: true,
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const response = data?.getUser?.children ?? [];
  const books = fromResponse(response);

  return { loading, error, books, refetch };
}
