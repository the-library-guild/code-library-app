import { BookResource, fromResponse } from '@/services/code-library-server';
import { gql, useQuery } from '@apollo/client';
import { createContext, useContext, useEffect } from 'react';
import { Spinner, useColorModeValue } from '@chakra-ui/react';
import { PermissionDeniedWidget } from './PermissionDeniedWidget';

function Loading() {
  return (
    <Spinner
      alignSelf={'center'}
      thickness="4px"
      speed="0.65s"
      color={useColorModeValue('gray.600', 'gray.300')}
      size="xl"
    />
  );
}

const AccountManagementContext = createContext({} as any);

export function AccountManagementContextProvider({ email, children }) {
  const { loading, error, books } = useUserBorrowedBooks(email);

  const value = {
    numberOfBooksBorrowed: books.length,
    borrowedIds: books,
    error,
    loading,
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <PermissionDeniedWidget
        title={
          'We are unable to load your personal information. Please try again later.'
        }
      />
    );
  }

  return (
    <AccountManagementContext.Provider value={value}>
      {children}
    </AccountManagementContext.Provider>
  );
}

interface getBooksResponse {
  getUser: {
    childrenIds: string[];
    children: BookResource[];
  };
}

export function useAccount() {
  const context = useContext(AccountManagementContext);

  if (context === undefined) {
    throw new Error(
      `useAccount must be wrapped within AccountManagementContextProvider.`
    );
  }

  return context;
}

const GET_USER = gql`
  query GetUserBooks($email: String!) {
    getUser(email: $email) {
      childrenIds
      children {
        _id
        name
        tags
        rentable {
          dueDate
          stateTags
          rentedDate
        }
        media {
          contentTags
          tagline
          publishedDate
          contentDesc
          creators
        }
      }
    }
  }
`;

export function useUserBorrowedBooks(email: string) {
  const { loading, error, data, refetch } = useQuery<getBooksResponse>(
    GET_USER,
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
