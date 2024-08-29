import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, Locations, RequestStatus } from '../../const';
import OffersListContainer from './offers-list-container';

describe('Component: OffersListContainer', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();
    const expectedText = /1 place to stay in Paris/i;

    renderWithRouterAndRedux(
      <OffersListContainer
        offers={[mockOffer]}
        isEmpty={false}
        currentCity={Locations[0]}
      />,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.Auth,
            requestStatus: RequestStatus.Success,
          },
          offers: {
            activeOffer: Locations[0].name,
            offers: [mockOffer],
            requestStatus: RequestStatus.Success,
          },
        },
      }
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
