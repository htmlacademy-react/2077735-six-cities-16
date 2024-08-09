import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found/not-found';
import { PrivateRoute, PublicRoute } from '../private-route/private-route';
import { Offer, Review, AuthStatus } from '../../types';
import { APP_ROUTE } from '../../const';

const currentStatus: AuthStatus = 'AUTH';

type AppProps = {
  favorites: Offer[];
  reviews: Review[];
};

export default function App({ favorites, reviews }: AppProps): JSX.Element {
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
          path: APP_ROUTE.OFFER,
          element: <OfferPage reviews={reviews} />,
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
          path: APP_ROUTE.NOT_FOUND,
          element: <NotFound />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
