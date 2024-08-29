import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, Locations, RequestStatus } from '../../const';
import Main from './main-page';
import { makeFakeOffer } from '../../utils/test-mocks';

describe('Page: Main', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();
    renderWithRouterAndRedux(<Main />, {
      preloadedState: {
        city: {
          currentCity: Locations[0],
        },
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
        offers: {
          activeOffer: mockOffer.id,
          offers: [mockOffer],
          requestStatus: RequestStatus.Success,
        },
        favorites: {
          favorites: [mockOffer],
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });
});
