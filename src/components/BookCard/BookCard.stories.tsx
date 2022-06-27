import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookLifecycleStatus } from '@/services/code-library-server/books';

import { BookCard } from './BookCard';
import { Stack } from '@chakra-ui/react';
import { mockSession } from '@/mocks/auth.handlers';
import { CodeLibraryServer } from '@/services/code-library-server';
import { ApolloProvider } from '@apollo/client';
import { SessionProvider } from 'next-auth/react';

export default {
  component: BookCard,
  title: 'Library/BookCard',
} as ComponentMeta<typeof BookCard>;

const Preview = ({ children }) => {
  return (
    <SessionProvider session={mockSession} refetchInterval={0}>
      <ApolloProvider client={CodeLibraryServer}>
        <Stack p={['1rem', '2rem']} mt={'2.5rem'}>
          {children}
        </Stack>
      </ApolloProvider>
    </SessionProvider>
  );
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

const Template: ComponentStory<typeof BookCard> = (args) => (
  <Preview>
    <BookCard {...args} />
  </Preview>
);

export const Available = Template.bind({});
Available.args = {
  book,
};

export const Borrowed = Template.bind({});
Borrowed.args = {
  book: {
    ...book,
    status: 'Borrowed',
  },
};

export const Processing = Template.bind({});
Processing.args = {
  book: {
    ...book,
    status: 'Processing',
  },
};

export const WithActionButton = Template.bind({});

WithActionButton.args = {
  book,
  isExpanded: true,
};

const bookWithLongText = {
  ...book,
  title:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cum aliquam eveniet, nihil numquam nulla, assumenda alias ratione aspernatur quod debitis aliquid impedit adipisci, enim illo qui maiores voluptatem ipsam.',
  subTitle:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cum aliquam eveniet, nihil numquam nulla, assumenda alias ratione aspernatur quod debitis aliquid impedit adipisci, enim illo qui maiores voluptatem ipsam.',
};

export const WithLongText = Template.bind({});

WithLongText.args = {
  ...WithActionButton.args,
  book: bookWithLongText,
};
