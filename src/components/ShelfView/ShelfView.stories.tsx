import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ShelfView } from './ShelfView';
import { InternalPage } from '../InternalPage';
import {
  LIBRARIAN_ROLE,
  STUDENT_ROLE,
  UserRole,
} from '@/hooks/use-user-info.hook';
import CodeLibraryServer, {
  BookLifecycleStatus,
} from '@/services/code-library-server';
import { SessionProvider } from 'next-auth/react';
import { ApolloProvider } from '@apollo/client';

export default {
  component: ShelfView,
  title: 'Screens/Shelf',
} as ComponentMeta<typeof ShelfView>;

const sampleUser = {
  email: 'john.doe@code.berlin',
  name: 'John Doe',
  picture: '',
  permsInt: 4,
  bookingLimit: 2,
  numOfBooksBorrowed: 10,
  role: STUDENT_ROLE as UserRole,
  exp: 0,
  iat: 0,
  _doc: { childrenIds: [] },
};

const book = {
  id: 'fake-book-id',
  title: 'The Only Book',
  subTitle: 'The only book you will ever need',
  designation: 'PM',
  status: 'Available' as BookLifecycleStatus,
  subjectArea: 'Phylosophy',
  quantity: 1,
  isbn: '',
};

const Preview = ({ user, children }) => {
  const session = {
    user: { ...user },
    expires: new Date().toDateString(),
  };
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ApolloProvider client={CodeLibraryServer}>
        <InternalPage user={user}>{children}</InternalPage>
      </ApolloProvider>
    </SessionProvider>
  );
};

const StudentsTemplate: ComponentStory<typeof ShelfView> = (args) => (
  <Preview user={sampleUser}>
    <ShelfView {...args} />
  </Preview>
);

export const Students = StudentsTemplate.bind({});
Students.args = {
  loading: false,
  error: undefined,
  books: Array.from({ length: 10 }, () => ({ ...book })),
};

const LibrariansTemplate: ComponentStory<typeof ShelfView> = (args) => (
  <Preview user={{ ...sampleUser, role: LIBRARIAN_ROLE as UserRole }}>
    <ShelfView {...args} />
  </Preview>
);

export const Librarians = LibrariansTemplate.bind({});
Librarians.args = {
  loading: false,
  error: undefined,
  books: Array.from({ length: 10 }, () => ({ ...book })),
};
