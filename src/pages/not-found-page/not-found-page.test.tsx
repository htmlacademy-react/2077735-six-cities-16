import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import NotFound from './not-found-page';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Page: NotFound', () => {
  it('renders', () => {
    const expectedText = /Page Not Found/i;
    renderWithRouterAndRedux(<NotFound />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
        favorites: {
          favorites: [],
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
