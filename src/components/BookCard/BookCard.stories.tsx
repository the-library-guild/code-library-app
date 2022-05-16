import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BookCardComponent as BookCard } from './BookCard';

export default {
  component: BookCard,
  title: 'Library/BookCard',
} as ComponentMeta<typeof BookCard>;

const Preview = ({ children }) => {
  return <div style={{ padding: '1rem', marginTop: '2rem' }}>{children}</div>;
};

const book = {
  _id: 'fake-book-id',
  name: 'The Only Book',
  rentable: {
    stateTags: ['Available'],
  },
  media: {
    contentTags: ['', '', '', 'PM'],
    tagline: 'The only book you will ever need',
    publishedDate: new Date('now'),
    contentDesc: '',
  },
};

const useBookStateValueSample = {
  hasAction: false,
  action: false,
  actionLabel: '',
  color: 'green.300',
  label: 'Available',
};

const useUserInfoValueSample = {
  user: {
    bookingLimit: 2,
    email: 'marcelo.teixeira@code.berlin',
    exp: 1655312227,
    iat: 1652720227,
    image:
      'https://lh3.googleusercontent.com/a-/AOh14GjZEjXY1n-mNsmCnoYbEVgwh75kCOCpUeFYYJc0=s96-c',
    name: 'Marcelo Teixeira dos Santos',
    permsInt: 16,
    role: 'librarian',
  },
  status: 'authenticated',
  isLoading: false,
  isLoggedIn: true,
  hasPerms: (perms: number) => {
    console.log(perms);
    return true;
  },
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
