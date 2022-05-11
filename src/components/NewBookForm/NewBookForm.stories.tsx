import { ComponentMeta } from '@storybook/react';

import { NewBookForm, NewBookFormValues } from './NewBookForm';

const onSubmit = (values: NewBookFormValues) => {
  alert(JSON.stringify(values, null, 2));
};

const onCancel = () => alert('Cancelled!');

export default {
  component: NewBookForm,
  title: 'Library/NewBookForm',
} as ComponentMeta<typeof NewBookForm>;

export const Default = () => (
  <NewBookForm onSubmit={onSubmit} onCancel={onCancel} />
);
