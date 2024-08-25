import { BrowserRouter } from 'react-router-dom';
import { AuthorizationStatus, RequestStatus } from '../../const';
import { withStore } from '../../utils/mock-component';
import { screen } from '@testing-library/react';

import FavoriteButton from './favorite-button';

describe('Component: FavoriteButton', () => {
  it('renders correct label when user is logged in', () => {
    const expectedText = /In bookmarks/i;
    withStore(
      <BrowserRouter>
        <FavoriteButton classNamePrefix="" isFavorite offerId="" />
      </BrowserRouter>,
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
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('renders correct label when user is not logged in', () => {
    const expectedText = /To bookmarks/i;
    withStore(
      <BrowserRouter>
        <FavoriteButton classNamePrefix="" isFavorite offerId="" />
      </BrowserRouter>,
      {
        preloadedState: {
          auth: {
            userData: null,
            authorizationStatus: AuthorizationStatus.NotAuth,
            requestStatus: RequestStatus.Success,
          },
        },
      }
    );
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
