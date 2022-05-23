import { graphql } from 'msw';

import { GET_BOOK, GET_SHELF } from '@/services/code-library-server/queries';
import { CREATE_BOOK } from '@/services/code-library-server';
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

const bookSample = {
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
    publishedDate: null,
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

const books = new Map([
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

  server.mutation(CREATE_BOOK, (req, res, ctx) => {
    const { bookData } = req.body.variables;

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
  }),
];
