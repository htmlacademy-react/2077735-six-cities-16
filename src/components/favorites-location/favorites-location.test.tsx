import { screen } from '@testing-library/react';
import FavoritesLocation from './favorites-location';
import { renderWithRouter } from '../../utils/mock-component';

describe('Component: FavoritesLocation', () => {
  it('renders correct city name', () => {
    const expectedText = /Paris/i;

    renderWithRouter(<FavoritesLocation cityName="Paris" favorites={[]} />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
