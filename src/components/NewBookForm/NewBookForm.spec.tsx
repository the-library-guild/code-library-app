import { render, screen, waitFor } from '@testing-library/react';

import user from '@testing-library/user-event';

import { ApolloProvider } from '@apollo/client';

import { worker as server } from '@/mocks/node';

import {
  book,
  NewBookForm,
  NewBookFormLoader,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';

import CodeLibraryServer from '@/services/code-library-server';

const args = {
  onSubmit: jest.fn(),
};

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());

describe('NewBookForm', () => {
  beforeEach(() => jest.clearAllMocks());

  const renderForm = () => {
    return render(
      <NewBookForm {...args}>
        <NewBookFormControls>
          <NewBookFormSubmissionButton>Create</NewBookFormSubmissionButton>
        </NewBookFormControls>
      </NewBookForm>
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

  it('calls onSubmit with input values when submission button is clicked', async () => {
    const expectedValues = expect.objectContaining({
      ...book,
      publicationYear: 2014,
      subject: ['Engineering', 'Design', 'Accessibility'],
    });

    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);
    user.type(await findByLabelText(/sub title/i), book.subTitle);
    user.type(await findByLabelText(/author/i), book.author);
    user.type(await findByLabelText(/publisher/i), book.publisher);
    user.type(await findByLabelText(/year.*/i), book.publicationYear);
    user.type(await findByLabelText(/language/i), book.language);
    user.type(await findByLabelText(/subject area/i), book.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    await waitFor(
      () => {
        expect(args.onSubmit).toHaveBeenCalled();
      },
      { timeout: 500 }
    );
    expect(args.onSubmit).toHaveBeenCalledWith(expectedValues);
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

describe('NewBookFormLoader', () => {
  afterEach(() => server.resetHandlers());

  const renderForm = () => {
    return render(
      <ApolloProvider client={CodeLibraryServer}>
        <NewBookFormLoader {...args}>
          <NewBookFormControls>
            <NewBookFormSubmissionButton>Create</NewBookFormSubmissionButton>
          </NewBookFormControls>
        </NewBookFormLoader>
      </ApolloProvider>
    );
  };

  it('notifies the success of a new book submission', async () => {
    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);
    user.type(await findByLabelText(/sub title/i), book.subTitle);
    user.type(await findByLabelText(/author/i), book.author);
    user.type(await findByLabelText(/publisher/i), book.publisher);
    user.type(await findByLabelText(/year.*/i), book.publicationYear);
    user.type(await findByLabelText(/language/i), book.language);
    user.type(await findByLabelText(/subject area/i), book.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    expect(await findByText(/new book/i)).toBeInTheDocument();
    expect(
      await findByText(new RegExp(book.mainTitle, 'i'))
    ).toBeInTheDocument();
  });

  it('instructs unauthorized users', async () => {
    const { findByText, findByLabelText } = renderForm();

    book.mainTitle = 'unauthorized';

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);
    user.type(await findByLabelText(/sub title/i), book.subTitle);
    user.type(await findByLabelText(/author/i), book.author);
    user.type(await findByLabelText(/publisher/i), book.publisher);
    user.type(await findByLabelText(/year.*/i), book.publicationYear);
    user.type(await findByLabelText(/language/i), book.language);
    user.type(await findByLabelText(/subject area/i), book.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    expect(await findByText(/not allowed/i)).toBeInTheDocument();
  });

  it('flags relevant errors', async () => {
    const { findByText, findByLabelText } = renderForm();

    book.mainTitle = 'error';

    user.type(await findByLabelText(/book id/i), book.bookId);
    user.type(await findByLabelText(/main title/i), book.mainTitle);
    user.type(await findByLabelText(/sub title/i), book.subTitle);
    user.type(await findByLabelText(/author/i), book.author);
    user.type(await findByLabelText(/publisher/i), book.publisher);
    user.type(await findByLabelText(/year.*/i), book.publicationYear);
    user.type(await findByLabelText(/language/i), book.language);
    user.type(await findByLabelText(/subject area/i), book.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    expect(await findByText(/error/i)).toBeInTheDocument();
  });
});
