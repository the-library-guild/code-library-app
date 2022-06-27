import { ComponentMeta, ComponentStory } from '@storybook/react';

import { SessionProvider } from 'next-auth/react';

import { ApolloProvider } from '@apollo/client';

import { authHandlers, mockSession, mockUser } from '@/mocks/auth.handlers';

import CodeLibraryServer, {
  BookLifecycleStatus,
} from '@/services/code-library-server';

import { InternalPage } from '../InternalPage';
import { BookDetailsScreen } from '.';
import { handlers } from '@/mocks/handlers';
import {
  DEFAULT_USER_PERMS_INT,
  LIBRARIAN_PERMS_INT,
} from 'code-library-perms';

export default {
  component: BookDetailsScreen,
  title: 'Screens/BookDetails',
  argTypes: {
    onClickBack: { action: 'Clicked back!' },
  },
} as ComponentMeta<typeof BookDetailsScreen>;

const book = {
  id: '628a9ac2a811078ae8f9d46a',
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
    ...mockSession,
    user,
  };
  return (
    <SessionProvider session={session} refetchInterval={0}>
      <ApolloProvider client={CodeLibraryServer}>
        <InternalPage user={user} title={'Details'}>
          {children}
        </InternalPage>
      </ApolloProvider>
    </SessionProvider>
  );
};

const student = {
  ...mockUser,
  permsInt: DEFAULT_USER_PERMS_INT,
};

const Template: ComponentStory<typeof BookDetailsScreen> = (args) => (
  <Preview user={student}>
    <BookDetailsScreen {...args} />
  </Preview>
);

export const Available = Template.bind({});
Available.args = {
  loading: false,
  error: undefined,
  book,
};
Available.parameters = {
  msw: {
    handlers: [...handlers, ...authHandlers],
  },
};

export const Borrowed = Template.bind({});
Borrowed.args = {
  loading: false,
  error: undefined,
  book: {
    ...book,
    status: 'Borrowed',
  },
};
Borrowed.parameters = {
  msw: {
    handlers: [...handlers, ...authHandlers],
  },
};

const librarian = {
  ...mockUser,
  permsInt: LIBRARIAN_PERMS_INT,
};

const LibrarianTemplate: ComponentStory<typeof BookDetailsScreen> = (args) => (
  <Preview user={librarian}>
    <BookDetailsScreen {...args} />
  </Preview>
);

export const Processing = LibrarianTemplate.bind({});
Processing.args = {
  loading: false,
  error: undefined,
  book: {
    ...book,
    status: 'Processing',
  },
};
Processing.parameters = {
  msw: {
    handlers: [...handlers, ...authHandlers],
  },
};
