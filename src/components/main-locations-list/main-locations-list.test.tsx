import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { LocationsNames } from '../../const';
import MainLocationsList from './main-locations-list';

describe('Component: MainLocationsList', () => {
  it('renders', () => {
    const mockCity = {
      name: LocationsNames[0],
      location: {
        latitude: 123,
        longitude: 123,
        zoom: 1,
      },
    };
    renderWithRouterAndRedux(<MainLocationsList />, {
      preloadedState: { city: { currentCity: mockCity } },
    });

    expect(screen.getByText(LocationsNames[3])).toBeInTheDocument();
  });
});
