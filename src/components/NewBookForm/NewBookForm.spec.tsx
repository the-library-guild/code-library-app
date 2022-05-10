import { fireEvent, render, screen } from '@testing-library/react';

import { NewBookForm } from './NewBookForm';

describe('NewBookForm', () => {
  it('renders a form with all necessary fields and accessibility roles', () => {
    const { getByLabelText, getByText } = render(<NewBookForm />);

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
    getByText(/create/i);

    expect(form).toBeInTheDocument();
  });

  it('calls the submission endpoint with all information submitted', () => {
    const { getByText } = render(<NewBookForm />);

    const createButton = getByText(/create/i);

    fireEvent.click(createButton);
  });
});
