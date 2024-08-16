import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/layout';
import Main from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites-page/favorites-page';
import Login from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import { APP_ROUTE } from '../../const';

export default function App() {
  const router = createBrowserRouter([
    {
      path: APP_ROUTE.ROOT,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: APP_ROUTE.FAVORITES,
          element: (
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          ),
        },
        {
          path: APP_ROUTE.OFFER_ID,
          element: <OfferPage />,
        },
        {
          path: APP_ROUTE.LOGIN,
          element: (
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
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
