import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import MainLocationsItem from './main-locations-item';
import { LocationsNames } from '../../const';

describe('Component: MainLocationsItem', () => {
  it('renders', () => {
    const mockCity = {
      name: LocationsNames[0],
      location: {
        latitude: 123,
        longitude: 123,
        zoom: 1,
      },
    };
    renderWithRouterAndRedux(<MainLocationsItem locationsItem={mockCity} />, {
      preloadedState: { city: { currentCity: mockCity } },
    });

    expect(screen.getByText(LocationsNames[0])).toBeInTheDocument();
  });
});
