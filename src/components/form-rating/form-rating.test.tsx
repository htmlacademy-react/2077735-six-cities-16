import { render, screen } from '@testing-library/react';
import FormRating from './form-rating';

describe('Component: FavoritesLocation', () => {
  it('renders correct city name', () => {

    render(<FormRating disabled={false} />);

    expect(screen.getByTestId('form-rating')).toBeInTheDocument();
  });
});
