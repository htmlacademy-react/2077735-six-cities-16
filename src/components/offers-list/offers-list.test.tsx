import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';
import OffersList from './offers-list';

describe('Component: OffersList', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();

    renderWithRouterAndRedux(
      <OffersList offers={[mockOffer]} className="" onCardHover={() => {}} />,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.Auth,
            requestStatus: RequestStatus.Success,
          },
        },
      }
    );

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
  });
});
