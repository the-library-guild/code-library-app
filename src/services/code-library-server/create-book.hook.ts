import { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

import { NewBookFormValues } from '@/components/NewBookForm';

const CREATE_BOOK = gql`
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

export function useCreateBook() {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK);

  const createBookFromFormValues = useCallback(
    (values: NewBookFormValues) => {
      return createBook({
        variables: {
          bookData: {
            tags: ['book', 'borrowable', 'physical', 'media'],
            name: values.mainTitle,
            media: {
              contentTags: ['', values.bookId, '', 'SE'],
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
    [createBook]
  );

  return {
    createBook: createBookFromFormValues,
    data,
    loading,
    error,
  };
}
