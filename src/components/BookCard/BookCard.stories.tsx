import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookLifecycleStatus } from '@/services/code-library-server/books';

import { BookCardComponent as BookCard } from './BookCard';
import { Stack } from '@chakra-ui/react';

export default {
  component: BookCard,
  title: 'Library/BookCard',
} as ComponentMeta<typeof BookCard>;

const Preview = ({ children }) => {
  return (
    <Stack p={'1rem'} mt={'2rem'}>
      {children}
    </Stack>
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

const SingleNonInteractiveTemplate: ComponentStory<typeof BookCard> = (
  args
) => (
  <Preview>
    <BookCard {...args} />
  </Preview>
);

export const Available = SingleNonInteractiveTemplate.bind({});

Available.args = {
  book,
  color: 'green.300',
  label: 'Available',
};

export const Borrowed = SingleNonInteractiveTemplate.bind({});

Borrowed.args = {
  book,
  color: 'red.300',
  label: 'Borrowed',
};

export const WithActionButton = SingleNonInteractiveTemplate.bind({});

WithActionButton.args = {
  book,
  color: 'green.300',
  label: 'Available',
  isExpanded: true,
  hasAction: true,
  action: false,
  actionLabel: 'Borrow',
};

const bookWithLongDescription = {
  ...book,
  subTitle:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas cum aliquam eveniet, nihil numquam nulla, assumenda alias ratione aspernatur quod debitis aliquid impedit adipisci, enim illo qui maiores voluptatem ipsam.',
};

export const WithLongDescription = SingleNonInteractiveTemplate.bind({});

WithLongDescription.args = {
  ...WithActionButton.args,
  book: bookWithLongDescription,
};

const MultipleSingleNonInteractiveTemplate: ComponentStory<typeof BookCard> = (
  args
) => (
  <Preview>
    <BookCard {...args} />
    <BookCard {...args} />
    <BookCard {...args} />
    <BookCard {...args} />
  </Preview>
);

export const Multiple = MultipleSingleNonInteractiveTemplate.bind({});

Multiple.args = {
  ...WithActionButton.args,
};
