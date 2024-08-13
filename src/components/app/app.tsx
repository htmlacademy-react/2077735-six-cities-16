import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found/not-found';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';
import { Offer, AuthStatus } from '../../types';
import { APP_ROUTE } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { getToken } from '../../services/token';
import { useEffect } from 'react';
import { checkAuth } from '../../store/slices/auth';

const currentStatus: AuthStatus = 'AUTH';

type AppProps = {
  favorites: Offer[];
};

export default function App({ favorites }: AppProps): JSX.Element {
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [token]);

  const router = createBrowserRouter([
    {
      path: APP_ROUTE.ROOT,
      element: <Layout favoritesCount={favorites.length} />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: APP_ROUTE.FAVORITES,
          element: (
            <PrivateRoute status={currentStatus}>
              <Favorites favorites={favorites} />
            </PrivateRoute>
          ),
        },
        {
          path: APP_ROUTE.OFFER_ID,
          element: <OfferPage />,
        },
        {
          path: APP_ROUTE.LOGIN,
          element: (
            <PublicRoute status={currentStatus}>
              <Login />
            </PublicRoute>
          ),
        },
        {
          path: '*',
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
