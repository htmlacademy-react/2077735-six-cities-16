import { screen } from '@testing-library/react';
import Map from './map';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithStore } from '../../utils/mock-component';
import { Locations, RequestStatus } from '../../const';

describe('Component: Map', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();
    const mockLocation = mockOffer.city.location;
    renderWithStore(
      <Map
        cityLocation={mockLocation}
        offers={[mockOffer]}
        activeOfferLocation={mockLocation}
      />,
      {
        preloadedState: {
          offers: {
            activeOffer: Locations[0].name,
            offers: [mockOffer],
            requestStatus: RequestStatus.Success,
          },
        },
      }
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
