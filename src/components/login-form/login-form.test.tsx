import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from '../../utils/mock-component';
import LoginForm from './login-form';
import { AuthorizationStatus, RequestStatus } from '../../const';

describe('Component: LoginForm', () => {
  const { getByText } = screen;

  it('renders', () => {
    renderWithRouterAndRedux(<LoginForm />,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.Auth,
            requestStatus: RequestStatus.Success,
          },
        },
      });

    expect(getByText('Sign in')).toBeInTheDocument();
  });
});
