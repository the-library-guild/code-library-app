import { ComponentMeta, ComponentStory } from '@storybook/react';

import { graphql } from 'msw';

import { ApolloProvider } from '@apollo/client';

import { screen, userEvent } from '@storybook/testing-library';

import { useBreakpointValue } from '@chakra-ui/react';

import { book } from './NewBookForm.examples';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';

import CodeLibraryServer, { CREATE_BOOK } from '@/services/code-library-server';
import {
  NewBookFormDialog,
  NewBookFormDialogButton,
} from './NewBookFormDialog';

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
    <ApolloProvider client={CodeLibraryServer}>
      <NewBookForm {...args}>
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
    </ApolloProvider>
  </Preview>
);

export const Default = NonInteractiveTemplate.bind({});
Default.parameters = {
  msw: {
    handlers: [
      graphql.mutation(CREATE_BOOK, (req, res, ctx) => {
        const { bookData } = req.variables;

        const bookId = bookData.media.contentTags[1] || undefined;

        if (bookId === undefined) {
          return res(
            ctx.data({
              createBook: {
                __typename: 'Error',
                msg: 'Book ID is required',
              },
            })
          );
        }

        return res(
          ctx.data({
            createBook: {
              __typename: 'Success',
              id: bookId,
            },
          })
        );
      }),
    ],
  },
};

export const Filled = NonInteractiveTemplate.bind({});

Filled.parameters = {
  ...Default.parameters,
};

const fillInput = (id: RegExp) => {
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

Submitting.parameters = {
  msw: {
    handlers: [
      graphql.mutation(CREATE_BOOK, (req, res, ctx) => {
        const { bookData } = req.variables;

        const bookId = bookData.media.contentTags[1] || undefined;

        return res(
          ctx.delay(4000),
          ctx.data({
            createBook: {
              __typename: 'Success',
              id: bookId,
            },
          })
        );
      }),
    ],
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

  const submissionButton = screen.getByText(/create/i, { selector: 'button' });

  await userEvent.click(submissionButton);
};

const DialogTemplate: ComponentStory<typeof NewBookFormDialog> = (args) => (
  <Preview>
    <ApolloProvider client={CodeLibraryServer}>
      <NewBookFormDialog {...args}>
        <NewBookFormDialogButton>+ Create new book</NewBookFormDialogButton>
      </NewBookFormDialog>
    </ApolloProvider>
  </Preview>
);

export const Dialog = DialogTemplate.bind({});
Dialog.parameters = {
  msw: {
    handlers: [
      graphql.mutation(CREATE_BOOK, (req, res, ctx) => {
        const { bookData } = req.variables;

        const bookId = bookData.media.contentTags[1] || undefined;

        if (bookId === undefined) {
          return res(
            ctx.delay(2000),
            ctx.data({
              createBook: {
                __typename: 'Error',
                msg: 'Book ID is required',
              },
            })
          );
        }

        return res(
          ctx.delay(2000),
          ctx.data({
            createBook: {
              __typename: 'Success',
              id: bookId,
            },
          })
        );
      }),
    ],
  },
};
