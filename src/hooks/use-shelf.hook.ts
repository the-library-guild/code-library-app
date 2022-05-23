import { useQuery } from '@apollo/client';

import {
  GET_SHELF,
  BookResource,
  fromResponse,
} from '@/services/code-library-server';

interface getShelfResponse {
  getShelf: {
    children: BookResource[];
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

  const response = (data?.getShelf?.children ?? []) as BookResource[];
  const books = fromResponse(response);

  return { loading, error, books, refetch };
}
