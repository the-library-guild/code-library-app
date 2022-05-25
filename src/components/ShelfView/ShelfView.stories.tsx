import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ShelfView } from './ShelfView';
import { InternalPage } from '../InternalPage';
import { STUDENT_ROLE, UserRole } from '@/hooks/use-user-info.hook';

export default {
  component: ShelfView,
  title: 'Screens/ShelfView',
} as ComponentMeta<typeof ShelfView>;

const user = {
  email: 'john.doe@code.berlin',
  name: 'John Doe',
  picture: '',
  permsInt: 4,
  bookingLimit: 2,
  role: STUDENT_ROLE as UserRole,
  exp: 0,
  iat: 0,
  _doc: { childrenIds: [] },
};

const Preview = ({ children }) => {
  return <InternalPage user={user}>{children}</InternalPage>;
};

const Template: ComponentStory<typeof ShelfView> = (args) => (
  <Preview>
    <ShelfView {...args} />
  </Preview>
);

export const Default = Template.bind({});

Default.args = {
  loading: false,
  error: undefined,
  books: [],
};
