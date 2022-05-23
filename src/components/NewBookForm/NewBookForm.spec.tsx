import 'whatwg-fetch';

import { render, screen, waitFor } from '@testing-library/react';

import user from '@testing-library/user-event';

import { worker as server } from '@/mocks/node';

import {
  NewBookForm,
  NewBookFormLoader,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';
import { ApolloProvider } from '@apollo/client';
import CodeLibraryServer from '@/services/code-library-server';

const args = {
  onSubmit: jest.fn(),
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

  it('renders a form with the right accessibility role', () => {
    renderForm();

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('renders all elements with accessible labels', () => {
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

  it('calls the onSubmit callback when submission button is clicked', async () => {
    const expectedValues = expect.objectContaining({
      ...sample,
      publicationYear: 2014,
      subject: ['Engineering', 'Design', 'Accessibility'],
    });

    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), sample.bookId);
    user.type(await findByLabelText(/main title/i), sample.mainTitle);
    user.type(await findByLabelText(/sub title/i), sample.subTitle);
    user.type(await findByLabelText(/author/i), sample.author);
    user.type(await findByLabelText(/publisher/i), sample.publisher);
    user.type(await findByLabelText(/year.*/i), sample.publicationYear);
    user.type(await findByLabelText(/language/i), sample.language);
    user.type(await findByLabelText(/subject area/i), sample.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
    });
    expect(args.onSubmit).toHaveBeenCalledWith(expectedValues);
  });

  it('disables submission button while submitting form', async () => {
    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), sample.bookId);
    user.type(await findByLabelText(/main title/i), sample.mainTitle);
    user.type(await findByLabelText(/sub title/i), sample.subTitle);
    user.type(await findByLabelText(/author/i), sample.author);
    user.type(await findByLabelText(/publisher/i), sample.publisher);
    user.type(await findByLabelText(/year.*/i), sample.publicationYear);
    user.type(await findByLabelText(/language/i), sample.language);
    user.type(await findByLabelText(/subject area/i), sample.subject);

    const createButton = await findByText(/create/i, { selector: 'button' });
    user.click(createButton);

    await waitFor(() => {
      expect(createButton).toBeDisabled();
    });
  });
});

describe('NewBookFormLoader', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
  afterAll(() => server.close());
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

  it('notifies the success of a new book creation', async () => {
    const { findByText, findByLabelText } = renderForm();

    user.type(await findByLabelText(/book id/i), sample.bookId);
    user.type(await findByLabelText(/main title/i), sample.mainTitle);
    user.type(await findByLabelText(/sub title/i), sample.subTitle);
    user.type(await findByLabelText(/author/i), sample.author);
    user.type(await findByLabelText(/publisher/i), sample.publisher);
    user.type(await findByLabelText(/year.*/i), sample.publicationYear);
    user.type(await findByLabelText(/language/i), sample.language);
    user.type(await findByLabelText(/subject area/i), sample.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    expect(await findByText(/new book/i)).toBeInTheDocument();
    expect(
      await findByText(new RegExp(sample.mainTitle, 'i'))
    ).toBeInTheDocument();
  });

  it('notifies when user is not authorized to create new books', async () => {
    const { findByText, findByLabelText } = renderForm();

    sample.mainTitle = 'unauthorized';

    user.type(await findByLabelText(/book id/i), sample.bookId);
    user.type(await findByLabelText(/main title/i), sample.mainTitle);
    user.type(await findByLabelText(/sub title/i), sample.subTitle);
    user.type(await findByLabelText(/author/i), sample.author);
    user.type(await findByLabelText(/publisher/i), sample.publisher);
    user.type(await findByLabelText(/year.*/i), sample.publicationYear);
    user.type(await findByLabelText(/language/i), sample.language);
    user.type(await findByLabelText(/subject area/i), sample.subject);

    user.click(await findByText(/create/i, { selector: 'button' }));

    expect(await findByText(/not allowed/i)).toBeInTheDocument();
    expect(
      await findByText(new RegExp(sample.mainTitle, 'i'))
    ).toBeInTheDocument();
  });
});
