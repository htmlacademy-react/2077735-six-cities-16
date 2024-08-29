import { screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/test-mocks';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';
import Favorites from './favorites-page';

describe('Page: Favorites', () => {
  it('renders', () => {
    const mockOffer = makeFakeOffer();
    renderWithRouterAndRedux(<Favorites />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
        favorites: {
          favorites: [mockOffer],
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });
});
