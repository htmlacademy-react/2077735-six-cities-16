import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import { AuthorizationStatus, RequestStatus } from '../../const';
import Login from './login-page';

describe('Page: Login', () => {
  it('renders', () => {
    renderWithRouterAndRedux(<Login />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
      },
    });

    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
