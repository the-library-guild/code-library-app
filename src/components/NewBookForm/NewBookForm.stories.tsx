import { ComponentMeta, ComponentStory } from '@storybook/react';

// eslint-disable-next-line storybook/use-storybook-testing-library
import { Matcher } from '@testing-library/react';

import { screen, userEvent } from '@storybook/testing-library';

import { Alert, AlertIcon, Button } from '@chakra-ui/react';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from './NewBookForm';

import { AddNewBookModal } from '../AddNewBookModal/AddNewBookModal';

export default {
  component: NewBookForm,
  title: 'Library/NewBookForm',
} as ComponentMeta<typeof NewBookForm>;

const Preview = ({ children }) => (
  <div style={{ padding: '2rem' }}>{children}</div>
);

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

export const Empty = NonInteractiveTemplate.bind({});

Empty.args = {
  onSubmit: () => ({
    success: false,
    error: null,
    loading: false,
  }),
};

export const Filled = NonInteractiveTemplate.bind({});

Filled.args = {
  onSubmit: () => ({
    success: true,
    error: null,
    loading: false,
  }),
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

const sample = {
  bookId: 'A11Y04',
  mainTitle: 'Inclusive Designing',
  subTitle: 'Joining Usability, Accessibility, and Inclusion',
  author: 'P. M. Langdon, J. Lazar, A. Heylighen, H. Dong',
  publisher: 'Springer',
  publicationYear: '2014',
  language: 'en',
  subject: 'Engineering/Design/Accessibility',
};

Filled.play = async () => {
  await fillInput(/book id/i).withText(sample.bookId);
  await fillInput(/main title/i).withText(sample.mainTitle);
  await fillInput(/sub title/i).withText(sample.subTitle);
  await fillInput(/author/i).withText(sample.author);
  await fillInput(/publisher/i).withText(sample.publisher);
  await fillInput(/year of publication/i).withText(sample.publicationYear);
  await fillInput(/language/i).withText(sample.language);
  await fillInput(/subject area/i).withText(sample.subject);
};

const InteractiveTemplate: ComponentStory<typeof NewBookForm> = (args) => (
  <Preview>
    <Alert status={'info'} variant={'subtle'} my={4}>
      <AlertIcon />
      Click the &quot;Create&quot; button to see what happens
    </Alert>
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

export const OnError = InteractiveTemplate.bind({});

OnError.args = {
  onSubmit: () => ({
    success: false,
    error: { message: 'You can not add books to the shelf.' },
    loading: false,
  }),
};

const fillInWithSampleData = () => {
  screen.getByLabelText(/book id/i).value = sample.bookId;
  screen.getByLabelText(/main title/i).value = sample.mainTitle;
  screen.getByLabelText(/sub title/i).value = sample.subTitle;
  screen.getByLabelText(/author/i).value = sample.author;
  screen.getByLabelText(/publisher/i).value = sample.publisher;
  screen.getByLabelText(/year of publication/i).value = sample.publicationYear;
  screen.getByLabelText(/language/i).value = sample.language;
  screen.getByLabelText(/subject area/i).value = sample.subject;
};

OnError.play = fillInWithSampleData;

export const OnSuccess = InteractiveTemplate.bind({});

OnSuccess.args = {
  onSubmit: () => ({
    success: true,
    error: null,
    loading: false,
  }),
};

OnSuccess.play = fillInWithSampleData;

const ConsumerTemplate: ComponentStory<typeof NewBookForm> = (args) => (
  <Preview>
    <AddNewBookModal onSubmit={args.onSubmit}>
      {({ onOpen }) => (
        <Button onClick={onOpen} variant={'outline'}>
          + Create New Book
        </Button>
      )}
    </AddNewBookModal>
  </Preview>
);

export const InModal = ConsumerTemplate.bind({});

InModal.args = {
  onSubmit: () => ({
    success: true,
    error: null,
    loading: false,
  }),
};
