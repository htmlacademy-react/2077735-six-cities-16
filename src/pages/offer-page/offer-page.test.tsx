import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, Locations, RequestStatus } from '../../const';
import OfferPage from './offer-page';
import { makeFakeOffer } from '../../utils/test-mocks';

describe('Page: NotFound', () => {
  it('renders', () => {
    renderWithRouterAndRedux(<OfferPage />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
        offer: {
          offer: makeFakeOffer(),
          requestStatus: RequestStatus.Success,
          nearby: [],
        },
        city: {
          currentCity: Locations[0],
        },
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Success,
        },
        reviews: {
          reviews: [],
          requestStatus: RequestStatus.Success,
        },
        offers: {
          offers: [],
          activeOffer: 'testId',
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByTestId('offer-page')).toBeInTheDocument();
  });
});
