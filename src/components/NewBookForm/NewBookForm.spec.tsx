import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { NewBookForm } from './NewBookForm';

const onSubmit = jest.fn();
const onCancel = jest.fn();

const args = {
  onSubmit,
  onCancel,
};

describe('NewBookForm', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a form with the right accessibility role', () => {
    const { getByLabelText, getByText } = render(<NewBookForm {...args} />);

    const form = screen.getByRole('form');

    getByText(/New Book/i);
    getByLabelText(/book id/i);
    getByLabelText(/main title/i);
    getByLabelText(/sub title/i);
    getByLabelText(/author/i);
    getByLabelText(/publisher/i);
    getByLabelText(/year of publication/i);
    getByLabelText(/language/i);
    getByLabelText(/subject area/i);

    expect(form).toBeInTheDocument();
  });

  it('calls the onSubmit callback when submission button is clicked', async () => {
    const { getByText } = render(<NewBookForm {...args} />);

    const createButton = getByText(/create/i);

    fireEvent.click(createButton);

    await waitFor(() => expect(args.onSubmit).toHaveBeenCalled());
  });

  it('calls the onSubmit callback when submission button is clicked', async () => {
    const { getByText } = render(<NewBookForm {...args} />);

    const createButton = getByText(/create/i);

    fireEvent.click(createButton);

    const expectedValues = expect.objectContaining({
      bookId: expect.any(String),
      mainTitle: expect.any(String),
      subTitle: expect.any(String),
      author: expect.any(String),
      publisher: expect.any(String),
      publicationYear: expect.any(Number),
      language: expect.any(String),
      subject: expect.any(String),
    });

    await waitFor(() =>
      expect(args.onSubmit).toHaveBeenCalledWith(expectedValues)
    );
  });

  it('calls the onClose callback when cancelation button is clicked', async () => {
    const { getByText } = render(<NewBookForm {...args} />);

    const cancelButton = getByText(/cancel/i);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(args.onCancel).toHaveBeenCalled());
  });
});
