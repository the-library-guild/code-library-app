import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import {
  NewBookForm,
  NewBookFormControls,
  NewBookFormSubmissionButton,
} from '.';

const args = {
  onSubmit: jest.fn(),
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
      bookId: 'STS17',
      mainTitle: expect.any(String),
      subTitle: expect.any(String),
      author: expect.any(String),
      publisher: expect.any(String),
      publicationYear: expect.any(Number),
      language: expect.any(String),
      subject: ['War story', 'Fantasy'],
    });

    const { getByText, getByLabelText } = renderForm();

    (getByLabelText(/book id/i) as HTMLInputElement).value = 'STS17';
    (getByLabelText(/main title/i) as HTMLInputElement).value = '';
    (getByLabelText(/sub title/i) as HTMLInputElement).value = '';
    (getByLabelText(/author/i) as HTMLInputElement).value = '';
    (getByLabelText(/publisher/i) as HTMLInputElement).value = '';
    (getByLabelText(/year of publication/i) as HTMLInputElement).value = '';
    (getByLabelText(/language/i) as HTMLInputElement).value = '';
    (getByLabelText(/subject area/i) as HTMLInputElement).value =
      'War story/Fantasy';

    const createButton = getByText(/create/i);
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(args.onSubmit).toHaveBeenCalled();
      expect(args.onSubmit).toHaveBeenCalledWith(expectedValues);
    });
  });

  it('disables submission button while submitting form', async () => {
    const { getByText, getByLabelText } = renderForm();

    (getByLabelText(/book id/i) as HTMLInputElement).value = 'STS17';
    (getByLabelText(/main title/i) as HTMLInputElement).value = '';
    (getByLabelText(/sub title/i) as HTMLInputElement).value = '';
    (getByLabelText(/author/i) as HTMLInputElement).value = '';
    (getByLabelText(/publisher/i) as HTMLInputElement).value = '';
    (getByLabelText(/year of publication/i) as HTMLInputElement).value = '';
    (getByLabelText(/language/i) as HTMLInputElement).value = '';
    (getByLabelText(/subject area/i) as HTMLInputElement).value =
      'War story/Fantasy';

    const createButton = getByText(/create/i);
    fireEvent.click(createButton);

    await waitFor(() => {
      expect(createButton).toBeDisabled();
    });
  });
});
