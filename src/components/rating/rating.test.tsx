import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('renders', () => {
    render(<Rating rating={3} classNamePrefix="" />);

    expect(screen.getByText('Rating')).toBeInTheDocument();
  });
});
