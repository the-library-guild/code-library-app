import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { NewBookFormValues } from '@/components/NewBookForm';

export const CREATE_BOOK = gql`
  mutation CreateBook($bookData: BookData) {
    createBook(bookData: $bookData) {
      ... on Success {
        id
      }

      ... on MissingPermissionsError {
        msg
        requiredPermsInt
      }

      ... on Error {
        msg
      }
    }
  }
`;

type CreateBookError = { title: string; description: string } | undefined;
type CreateBookSuccess = { newId: string } | undefined;

export type CreateBookStatus = {
  error: CreateBookError;
  success: CreateBookSuccess;
  loading: boolean;
  data: any;
};

export type CreateBookHook = CreateBookStatus & {
  createBook: (values: NewBookFormValues) => Promise<any>;
};

export function useCreateBook(): CreateBookHook {
  const [createBookMutation, { ...status }] = useMutation(CREATE_BOOK);

  const createBook = useCallback(
    (values: NewBookFormValues) => {
      return createBookMutation({
        variables: {
          bookData: {
            tags: ['book', 'borrowable', 'physical', 'media'],
            name: values.mainTitle,
            media: {
              contentTags: ['', values.bookId, '', values.designation],
              creators: [values.author],
              publisher: values.publisher,
              language: values.language,
              contentDesc: values.subject.join('/'),
              subTitle: values.subTitle,
              tagline: values.subTitle,
              publishedDate: values.publicationYear,
            },
          },
        },
      });
    },
    [createBookMutation]
  );

  let error: CreateBookError;
  let success: CreateBookSuccess;

  if (status.error) {
    error = {
      title: 'Network Error',
      description: 'Something went wrong with our service. Try again later.',
    };
  }

  if (status.data) {
    const { __typename: type, ...response } = status.data.createBook;

    switch (type) {
      case 'Success':
        success = { newId: response.id };
        break;
      case 'MissingPermissionsError':
        error = {
          title: 'Unauthorized',
          description: response.msg,
        };
        break;
      case 'Error':
        error = {
          title: 'Internal Error',
          description: response.msg,
        };
        break;
      default:
    }
  }

  return {
    createBook,
    data: status.data,
    loading: status.loading,
    error,
    success,
  };
}
