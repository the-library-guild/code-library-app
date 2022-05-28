import { render, screen, waitFor } from '@testing-library/react';

import user from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';

import { graphql } from 'msw';

import { worker as server } from '@/mocks/node';

import {
  book,
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';

import CodeLibraryServer, { CREATE_BOOK } from '@/services/code-library-server';

const args = {
  onSuccess: jest.fn(),
  onError: jest.fn(),
};

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('NewBookForm', () => {
  afterEach(() => server.resetHandlers());

  const renderForm = () => {
    return render(
      <ApolloProvider client={CodeLibraryServer}>
        <NewBookForm {...args}>
          <NewBookFormControls>
            <NewBookFormSubmissionButton>Create</NewBookFormSubmissionButton>
          </NewBookFormControls>
        </NewBookForm>
      </ApolloProvider>
    );
  };

  it('renders a form element with the right accessibility role', () => {
    renderForm();

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('renders inputs with accessible labels', () => {
    const { getByLabelText } = renderForm();

    expect(getByLabelText(/book id/i)).toBeInTheDocument();
    expect(getByLabelText(/main title/i)).toBeInTheDocument();
    expect(getByLabelText(/sub title/i)).toBeInTheDocument();
    expect(getByLabelText(/author/i)).toBeInTheDocument();
    expect(getByLabelText(/publisher/i)).toBeInTheDocument();
    expect(getByLabelText(/year of publication/i)).toBeInTheDocument();
    expect(getByLabelText(/language/i)).toBeInTheDocument();
    expect(getByLabelText(/subject area/i)).toBeInTheDocument();
  });

  it('calls onSuccess after submission', async () => {
    const { getByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);

    const createButton = getByText(/create/i, { selector: 'button' });
    user.click(createButton);

    await waitFor(() => expect(args.onSuccess).toHaveBeenCalled());

    expect(args.onSuccess).toHaveBeenCalledWith({
      newId: 'Inclusive Designing',
    });
  });

  it('calls onError when submission failes', async () => {
    server.use(
      graphql.mutation(CREATE_BOOK, (_, res) => {
        return res.networkError('Oh snap... something went wrong');
      })
    );
    const { getByText } = renderForm();

    const createButton = getByText(/create/i, { selector: 'button' });
    user.click(createButton);

    await waitFor(() => expect(args.onError).toHaveBeenCalled());

    expect(args.onError).toHaveBeenCalledWith({
      title: 'Network Error',
      description: 'Something went wrong with our service. Try again later.',
    });
  });

  it('disables submission button while submitting form information', async () => {
    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);
    user.type(await findByLabelText(/sub title/i), book.subTitle);
    user.type(await findByLabelText(/author/i), book.author);
    user.type(await findByLabelText(/publisher/i), book.publisher);
    user.type(await findByLabelText(/year.*/i), book.publicationYear);
    user.type(await findByLabelText(/language/i), book.language);
    user.type(await findByLabelText(/subject area/i), book.subject);

    const createButton = await findByText(/create/i, { selector: 'button' });
    user.click(createButton);

    await waitFor(
      () => {
        expect(createButton).toBeDisabled();
      },
      { timeout: 500 }
    );
  });
});
