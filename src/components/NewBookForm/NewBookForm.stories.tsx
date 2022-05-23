import { ComponentMeta, ComponentStory } from '@storybook/react';

// eslint-disable-next-line storybook/use-storybook-testing-library
import { Matcher } from '@testing-library/react';

import { screen, userEvent } from '@storybook/testing-library';

import { useBreakpointValue } from '@chakra-ui/react';

import { book } from './NewBookForm.examples';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';

import {
  AddNewBookModal,
  AddNewBookModalButton,
} from '@/components/AddNewBookModal';

export default {
  component: NewBookForm,
  title: 'Library/NewBookForm',
} as ComponentMeta<typeof NewBookForm>;

const Preview = ({ children }) => {
  const padding = useBreakpointValue({ base: '1rem', md: '2rem' });

  return <div style={{ padding, marginTop: '1rem' }}>{children}</div>;
};

const NonInteractiveTemplate: ComponentStory<typeof NewBookForm> = (args) => (
  <Preview>
    <NewBookForm onSubmit={args.onSubmit}>
      <NewBookFormControls pt={6}>
        <NewBookFormSubmissionButton
          role="button"
          isLoading={false}
          loadingText={'Creating'}
        >
          Create
        </NewBookFormSubmissionButton>
      </NewBookFormControls>
    </NewBookForm>
  </Preview>
);

const onSubmit = () => {
  return;
};

export const Empty = NonInteractiveTemplate.bind({});

Empty.args = {
  onSubmit,
};

export const Filled = NonInteractiveTemplate.bind({});

Filled.args = {
  onSubmit,
};

const fillInput = (id: Matcher) => {
  const input = screen.getByLabelText(id);

  const withText = async (text: string) => {
    await userEvent.type(input, text, {
      delay: 10,
    });
  };

  return {
    withText,
  };
};

Filled.play = async () => {
  await fillInput(/book id/i).withText(book.bookId);
  await fillInput(/main title/i).withText(book.mainTitle);
  await fillInput(/sub title/i).withText(book.subTitle);
  await fillInput(/author/i).withText(book.author);
  await fillInput(/publisher/i).withText(book.publisher);
  await fillInput(/year of publication/i).withText(book.publicationYear);
  await fillInput(/language/i).withText(book.language);
  await fillInput(/subject area/i).withText(book.subject);
};

export const Submitting = NonInteractiveTemplate.bind({});

Submitting.args = {
  onSubmit: () => {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  },
};

Submitting.play = async () => {
  await fillInput(/book id/i).withText(book.bookId);
  await fillInput(/main title/i).withText(book.mainTitle);
  await fillInput(/sub title/i).withText(book.subTitle);
  await fillInput(/author/i).withText(book.author);
  await fillInput(/publisher/i).withText(book.publisher);
  await fillInput(/year of publication/i).withText(book.publicationYear);
  await fillInput(/language/i).withText(book.language);
  await fillInput(/subject area/i).withText(book.subject);

  const submissionButton = screen.getByText(/create/i);

  await userEvent.click(submissionButton);
};

const ConsumerTemplate: ComponentStory<typeof NewBookForm> = (args) => (
  <Preview>
    <AddNewBookModal {...args}>
      <AddNewBookModalButton>+ Create new book</AddNewBookModalButton>
    </AddNewBookModal>
  </Preview>
);

export const InModal = ConsumerTemplate.bind({});

InModal.args = {
  onSubmit: () => {
    return new Promise((resolve) => setTimeout(resolve, 4000));
  },
};
