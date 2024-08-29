import { screen } from '@testing-library/react';
import RandomCity from '../random-city/random-city';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { Locations } from '../../const';

describe('Component: RandomCity', () => {
  it('renders', () => {
    renderWithRouterAndRedux(<RandomCity />, {
      preloadedState: { city: { currentCity: Locations[0] } },
    });

    expect(screen.getByTestId('random-city')).toBeInTheDocument();
  });
});
