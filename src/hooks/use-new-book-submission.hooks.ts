import { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';

import { CREATE_BOOK } from '@/services/code-library-server/mutations';

type BookPayload = {
  bookId: string;
  mainTitle: string;
  subTitle: string;
  description?: string;
  language: string;
  subjects: string[];
  publicationYear: number;
  publisher: string;
  author: string;
};

export function useNewBookSubmission() {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK);

  const [success, setSuccess] = useState(false);

  const submit = (book: BookPayload) => {
    return createBook({
      variables: {
        bookData: {
          tags: ['book', 'borrowable', 'physical', 'media'],
          name: book.mainTitle,
          desc: book.subTitle,
          media: {
            contentTags: ['', book.bookId],
            contentDesc: book.subjects.join('/'),
            subTitle: book.subTitle,
            creators: [book.author],
            publisher: book.publisher,
            language: book.language,
            publishedDate: new Date(book.publicationYear, 0),
          },
        },
      },
    });
  };

  // Make onSubmit as simple as possible and handle
  // submission state outside the form component.
  // const onSubmit = (data) => {
  //   const result = submit(data);

  //   if (loading) {
  //     return {
  //       loading,
  //       success: false,
  //       error,
  //     };
  //   }

  //   if (error) {
  //     return {
  //       loading,
  //       success: false,
  //       error,
  //     };
  //   }

  //   if (result.id) {
  //     return {
  //       loading,
  //       success: true,
  //       error,
  //     };
  //   }
  // };

  useEffect(() => {
    if (loading) return;
    if (data) setSuccess(true);
    setSuccess(false);
  }, [loading, data]);

  return {
    submit,
    data,
    loading,
    error,
    success,
  };
}
