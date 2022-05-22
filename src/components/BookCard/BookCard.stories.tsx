import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookLifecycleStatus } from '@/services/code-library-server/books';

import { BookCardComponent as BookCard } from './BookCard';

export default {
  component: BookCard,
  title: 'Library/BookCard',
} as ComponentMeta<typeof BookCard>;

const Preview = ({ children }) => {
  return <div style={{ padding: '1rem', marginTop: '2rem' }}>{children}</div>;
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

const NonInteractiveTemplate: ComponentStory<typeof BookCard> = (args) => (
  <Preview>
    <BookCard {...args} />
  </Preview>
);

export const Available = NonInteractiveTemplate.bind({});

Available.args = {
  book,
  color: 'green.300',
  label: 'Available',
};

export const Borrowed = NonInteractiveTemplate.bind({});

Borrowed.args = {
  book,
  color: 'red.300',
  label: 'Borrowed',
};

export const Expanded = NonInteractiveTemplate.bind({});

Expanded.args = {
  book,
  color: 'red.300',
  label: 'Borrowed',
  isExpanded: true,
  hasAction: true,
  action: false,
  actionLabel: 'Borrow',
};
