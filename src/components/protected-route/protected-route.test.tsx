import { AppRoute, AuthorizationStatus, RequestStatus } from '../../const';
import { renderWithStore } from '../../utils/mock-component';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { screen } from '@testing-library/react';
import ProtectedRoute from './protected-route';
import { makeFakeUser } from '../../utils/test-mocks';

describe('Component: ProtectedRoute', () => {
  const routesConfig = [
    {
      path: AppRoute.Root,
      element: <span>Main</span>,
    },
    {
      path: AppRoute.Favorites,
      element: (
        <ProtectedRoute>
          <span>Favorites</span>
        </ProtectedRoute>
      ),
    },
    {
      path: AppRoute.Login,
      element: (
        <ProtectedRoute publicRoute>
          <span>Login</span>
        </ProtectedRoute>
      ),
    },
  ];

  it('redirects to Main page, when logged in user visits Login page', () => {
    const router = createMemoryRouter(routesConfig, {
      initialEntries: [AppRoute.Login],
    });

    renderWithStore(<RouterProvider router={router} />, {
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
      initialEntries: [AppRoute.Login],
    });

    renderWithStore(<RouterProvider router={router} />, {
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
      initialEntries: [AppRoute.Favorites],
    });

    renderWithStore(<RouterProvider router={router} />, {
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
      initialEntries: [AppRoute.Favorites],
    });

    renderWithStore(<RouterProvider router={router} />, {
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
