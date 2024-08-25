import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/mock-component';
import FavLocationsList from './favorites-locations-list';

describe('Component: FavoritesLocation', () => {
  it('renders correct city name', () => {
    const expectedText = /Saved listing/i;

    renderWithRouter(<FavLocationsList favorites={[]} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
