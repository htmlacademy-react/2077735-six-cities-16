import { screen } from '@testing-library/react';
import UserNav from './user-nav';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: UserNav', () => {
  it('renders', () => {
    renderWithRouterAndRedux(<UserNav />, {
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

    expect(screen.getByTestId('user-nav')).toBeInTheDocument();
  });
});
