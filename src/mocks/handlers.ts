import { graphql } from 'msw';

import { GET_BOOK, GET_SHELF } from '@/services/code-library-server/queries';
import {
  CREATE_BOOK,
  PROCESS_BOOK,
  RENT_BOOK,
  RETURN_BOOK,
} from '@/services/code-library-server';

import { Perm } from 'code-library-perms';

const parentContainerSample = {
  __typename: 'Item',
  _id: '628a9abfa811078ae8f9d466',
  desc: 'Official CODE Library Shelf™ in Space, students can borrow books under https://placeholder.site/',
  name: 'CODE Library Book Shelf',
  tags: ['shelf', 'container', 'physical'],
  media: {
    contentTags: [],
    tagline: null,
    publishedDate: null,
    contentDesc: null,
    creators: [],
  },
  rentable: {
    dueDate: null,
    stateTags: [],
    rentedDate: null,
  },
  childrenIds: [],
  children: [],
  parentId: null,
  parent: null,
};

export const bookSample = {
  __typename: 'Item',
  _id: '628a9ac2a811078ae8f9d46a',
  name: 'NeuroTribes',
  desc: 'A well curated trip around neuroscience.',
  tags: ['book', 'borrowable', 'physical', 'media'],
  parent: { ...parentContainerSample },
  media: {
    tagline:
      'The Legacy of Autism and How to Think Smarter About People Who Think Differently',
    contentTags: ['1', 'A11Y01', '', '', ''],
    contentDesc: 'Autism/Disorder',
    creators: ['Steve Silberman'],
    publisher: 'Allen&Unwin',
    language: 'en',
  },
  rentable: {
    dueDate: null,
    stateTags: ['Available'],
    rentedDate: null,
  },
  childrenIds: [],
  children: [],
};

const borrowed = new Map([]);

const books = new Map<string, typeof bookSample>([
  [
    '628a9ac2a811078ae8f9d46a',
    {
      ...bookSample,
      _id: '628a9ac2a811078ae8f9d46a',
      name: 'NeuroTribes',
      media: {
        ...bookSample.media,
        contentTags: ['1', 'A11Y01', '', '', ''],
        tagline:
          'The Legacy of Autism and How to Think Smarter About People Who Think Differently',
        contentDesc: 'Autism/Disorder',
        creators: ['Steve Silberman'],
      },
    },
  ],
  [
    '628a9ac2a811078ae8f9d46b',
    {
      ...bookSample,
      _id: '628a9ac2a811078ae8f9d46b',
      name: 'The Autistic Brain',
      media: {
        ...bookSample.media,
        contentTags: ['2', 'A11Y02', '', '', ''],
        tagline: 'Exploring the Strength of a Different Kind of Mind',
        contentDesc: 'Autism/Psychology/Science',
        creators: ['Temple Grandin, Richard Panek'],
      },
    },
  ],
]);

const server = graphql.link('http://localhost:3000/api/graphql');

type MissingPermissions = {
  msg: string;
  requiredPermsInt: number;
};

type Error = {
  __typename: string;
  msg: string;
};

type Success = {
  __typename: string;
  id: string;
};

type CreateBookMutation = {
  createBook: MissingPermissions | Error | Success;
};

type CreateBookMutationVariables = {
  bookData: {
    name: string;
    tags: string[];
    media: {
      contentTags: string[];
      creators: string[];
      publisher: string;
      language: string;
      contentDesc: string;
      subTitle?: string;
      tagline: string;
      publishedDate?: number;
    };
  };
};

export const handlers = [
  server.query(GET_SHELF, (_, res, ctx) => {
    return res(
      ctx.data({
        getShelf: {
          children: Array.from(books.values()),
        },
      })
    );
  }),

  server.query(GET_BOOK, (req, res, ctx) => {
    const { bookId } = req.variables;

    if (books.has(bookId)) {
      return res(
        ctx.data({
          getBook: books.get(bookId),
        })
      );
    }

    return res.networkError(`Could not find book with id ${bookId}`);
  }),

  server.mutation<CreateBookMutation, CreateBookMutationVariables>(
    CREATE_BOOK,
    (req, res, ctx) => {
      const { bookData } = req.variables;

      if (bookData.name.search(/unauthorized/i) !== -1) {
        return res(
          ctx.data({
            createBook: {
              __typename: 'MissingPermissionsError',
              msg: 'You are not allowed to create new books',
              requiredPermsInt: Perm.MANAGE_BOOKS,
            },
          })
        );
      }

      if (bookData.name.search(/error/i) !== -1) {
        return res(
          ctx.data({
            createBook: {
              __typename: 'Error',
              msg: 'Book ID already taken!',
            },
          })
        );
      }

      const newBook = {
        ...bookSample,
        _id: bookData.name,
        parent: { ...parentContainerSample },
        name: bookData.name,
        desc: 'New book',
        tags: bookData.tags,
        media: { ...bookData.media },
        rentable: {
          dueDate: null,
          stateTags: ['Available'],
          rentedDate: null,
        },
        childrenIds: [],
        children: [],
      };

      books.set(bookData.name, newBook);

      return res(
        ctx.data({
          createBook: {
            __typename: 'Success',
            id: newBook._id,
          },
        })
      );
    }
  ),

  server.mutation(RENT_BOOK, (req, res, ctx) => {
    const { bookId } = req.variables;

    if (books.has(bookId)) {
      const bookToRent = books.get(bookId) as typeof bookSample;

      books.set(bookId, {
        ...bookToRent,
        rentable: {
          ...bookToRent.rentable,
          stateTags: ['Borrowed'],
        },
      });

      borrowed.set(bookId, new Date().toDateString());

      return res(
        ctx.delay(3000),
        ctx.data({
          rentBook: {
            __typename: 'Success',
            id: bookId,
          },
        })
      );
    }

    return res(
      ctx.data({
        rentBook: {
          __typename: 'Error',
          msg: `Could not find book with id ${bookId}`,
        },
      })
    );
  }),

  server.mutation(RETURN_BOOK, (req, res, ctx) => {
    const { bookId } = req.variables;

    if (books.has(bookId)) {
      const bookToRent = books.get(bookId) as typeof bookSample;

      books.set(bookId, {
        ...bookToRent,
        rentable: {
          ...bookToRent.rentable,
          stateTags: ['Processing'],
        },
      });

      borrowed.delete(bookId);

      return res(
        ctx.delay(3000),
        ctx.data({
          returnBook: {
            __typename: 'Success',
            id: bookId,
          },
        })
      );
    }

    return res(
      ctx.data({
        returnBook: {
          __typename: 'Error',
          msg: `Could not find book with id ${bookId}`,
        },
      })
    );
  }),

  server.mutation(PROCESS_BOOK, (req, res, ctx) => {
    const { bookId } = req.variables;

    if (books.has(bookId)) {
      const bookToProcess = books.get(bookId) as typeof bookSample;

      books.set(bookId, {
        ...bookToProcess,
        rentable: {
          ...bookToProcess.rentable,
          stateTags: ['Available'],
        },
      });

      borrowed.delete(bookId);

      return res(
        ctx.delay(3000),
        ctx.data({
          processBook: {
            __typename: 'Success',
            id: bookId,
          },
        })
      );
    }

    return res(
      ctx.data({
        processBook: {
          __typename: 'Error',
          msg: `Could not find book with id ${bookId}`,
        },
      })
    );
  }),
];
