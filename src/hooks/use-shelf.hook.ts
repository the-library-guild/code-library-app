import { useQuery } from '@apollo/client';

import { Book, fromResponse } from '../services/code-library-server/books';
import { GET_SHELF } from '../services/code-library-server/queries';

interface getShelfResponse {
  getShelf: {
    children: Book[];
  };
}

export function useShelf(options: any = {}) {
  const { loading, error, data, refetch } = useQuery<getShelfResponse>(
    GET_SHELF,
    {
      ...options,
      returnPartialData: true,
      notifyOnNetworkStatusChange: true,
    }
  );

  const response = (data?.getShelf?.children ?? []) as Book[];
  const books = fromResponse(response);

  return { loading, error, books, refetch };
}
