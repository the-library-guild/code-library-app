import { graphql } from 'msw';

import { GET_BOOK, GET_SHELF } from '@/services/code-library-server/queries';

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

export const handlers = [
  graphql.query(GET_SHELF, (_, res, ctx) => {
    return res(
      ctx.data({
        getShelf: {
          children: Array.from(books.values()),
        },
      })
    );
  }),

  graphql.query(GET_BOOK, (req, res, ctx) => {
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
];
