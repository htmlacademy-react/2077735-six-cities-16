import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';
import OfferContainer from './offer-container';

describe('Component: OfferContainer', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();

    renderWithRouterAndRedux(
      <OfferContainer currentOffer={mockOffer}/>,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.Auth,
            requestStatus: RequestStatus.Success,
          },
          reviews: {
            reviews: [],
            requestStatus: RequestStatus.Success,
          }
        },
      }
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
