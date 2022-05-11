import { ComponentMeta } from '@storybook/react';

import { NewBookForm, NewBookFormValues } from './NewBookForm';

const onCancel = () => alert('Cancelled!');

export default {
  component: NewBookForm,
  title: 'Library/NewBookForm',
} as ComponentMeta<typeof NewBookForm>;

export const Empty = () => {
  const onSubmit = (values: NewBookFormValues) => {
    alert(JSON.stringify(values, null, 2));

    return {
      success: false,
      error: null,
      loading: false,
    };
  };

  const onCancel = () => alert('Cancelled!');

  return <NewBookForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export const Submitting = () => {
  const onSubmit = () => ({
    success: false,
    error: null,
    loading: true,
  });

  return <NewBookForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export const OnError = () => {
  const onSubmit = () => ({
    success: false,
    error: { message: 'Could not process your request' },
    loading: true,
  });

  return <NewBookForm onSubmit={onSubmit} onCancel={onCancel} />;
};

export const OnSuccess = () => {
  const onSubmit = () => ({
    success: true,
    error: null,
    loading: false,
  });

  return <NewBookForm onSubmit={onSubmit} onCancel={onCancel} />;
};
