import { screen } from '@testing-library/react';
import {
  renderWithRouter,
  renderWithRouterAndRedux,
} from '../../utils/mock-component';
import Header from './header';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: Header', () => {
  it('does not render userNav on Login page', () => {
    renderWithRouter(<Header isLoginPage />);

    expect(screen.queryByTestId('user-nav')).not.toBeInTheDocument();
  });

  it('renders userNav if it is not Login page', () => {
    renderWithRouterAndRedux(<Header />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByTestId('user-nav')).toBeInTheDocument();
  });
});
