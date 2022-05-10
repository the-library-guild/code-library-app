import { ComponentMeta } from '@storybook/react';

import { NewBookForm } from './NewBookForm';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Library/NewBookForm',
  component: NewBookForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NewBookForm>;

export { NewBookForm };
