import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { NewBookForm } from './NewBookForm';

const onSubmit = jest.fn(() => ({
  success: true,
  error: null,
  loading: false,
}));
const onCancel = jest.fn();

const args = {
  onSubmit,
  onCancel,
};

describe('NewBookForm', () => {
  beforeEach(() => jest.clearAllMocks());

  it('renders a form with the right accessibility role', () => {
    render(<NewBookForm {...args} />);

    const form = screen.getByRole('form');

    expect(form).toBeInTheDocument();
  });

  it('renders all elements with accessible labels', () => {
    const { getByLabelText } = render(<NewBookForm {...args} />);

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

    const { getByText, getByLabelText } = render(<NewBookForm {...args} />);

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

  it('calls the onClose callback when cancelation button is clicked', async () => {
    const { getByText } = render(<NewBookForm {...args} />);

    const cancelButton = getByText(/cancel/i);

    fireEvent.click(cancelButton);

    await waitFor(() => expect(args.onCancel).toHaveBeenCalled());
  });
});
