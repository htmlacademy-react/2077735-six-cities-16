import { APP_ROUTE, AuthorizationStatus, RequestStatus } from '../../const';
import { withStore } from '../../utils/mock-component';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { screen } from '@testing-library/react';
import ProtectedRoute from './protected-route';
import { makeFakeUser } from '../../utils/test-mocks';

describe('Component: ProtectedRoute', () => {
  const routesConfig = [
    {
      path: APP_ROUTE.ROOT,
      element: <span>Main</span>,
    },
    {
      path: APP_ROUTE.FAVORITES,
      element: (
        <ProtectedRoute>
          <span>Favorites</span>
        </ProtectedRoute>
      ),
    },
    {
      path: APP_ROUTE.LOGIN,
      element: (
        <ProtectedRoute publicRoute>
          <span>Login</span>
        </ProtectedRoute>
      ),
    },
  ];

  it('redirects to Main page, when logged in user visits Login page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [APP_ROUTE.LOGIN],
    });

    withStore(<RouterProvider router={router} />, {
      preloadedState: {
        auth: {
          userData: makeFakeUser(),
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    expect(screen.getByText('Main')).toBeInTheDocument();
  });

  it('renders Login page, when user is not authorized', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [APP_ROUTE.LOGIN],
    });

    withStore(<RouterProvider router={router} />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('redirects to Login page, when not authorized user visits Favorites page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [APP_ROUTE.FAVORITES],
    });

    withStore(<RouterProvider router={router} />, {
      preloadedState: {
        auth: {
          userData: null,
          authorizationStatus: AuthorizationStatus.NotAuth,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('renders Favorites page, when user is authorized', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [APP_ROUTE.FAVORITES],
    });

    withStore(<RouterProvider router={router} />, {
      preloadedState: {
        auth: {
          userData: makeFakeUser(),
          authorizationStatus: AuthorizationStatus.Auth,
          requestStatus: RequestStatus.Success,
        },
      },
    });
    expect(screen.getByText('Favorites')).toBeInTheDocument();
  });
});
