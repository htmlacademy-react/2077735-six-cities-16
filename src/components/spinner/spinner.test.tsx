import { render, screen } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('renders', () => {
    render(<Spinner />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
