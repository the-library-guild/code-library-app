import React from 'react';
import { Stack } from '@chakra-ui/react';

import { Perm } from 'code-library-perms';

import { Content } from '../../components/Content';
import { BooksContainer } from '../../components/BooksContainer';

function StudentReservationsPage() {
  const books = [
    {
      _id: 'dreamybook',
      name: 'Feature Not Implemented',
      rentable: {
        stateTags: ['Processing'],
      },
      media: {
        contentTags: [],
        tagline: 'Hold on there! We will be working on that very soon ❤️',
        publishedDate: new Date(),
        contentDesc: '',
      },
    },
  ];

  return (
    <Content>
      <Stack spacing={4} width="100%">
        <Stack spacing={6} wordBreak="break-all" width="100%">
          <BooksContainer
            {...{
              loading: false,
              error: null,
              books,
              maxIdx: 10,
            }}
          />
        </Stack>
      </Stack>
    </Content>
  );
}

StudentReservationsPage.permissions = Perm.VIEW_BOOKS;

export default StudentReservationsPage;
