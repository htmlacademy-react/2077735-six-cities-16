import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites-page';
import Login from '../../pages/login/login';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found/not-found';
import ProtectedRoute from '../protected-route/protected-route';
import { APP_ROUTE } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { getToken } from '../../services/token';
import { useEffect } from 'react';
import { checkAuth } from '../../store/slices/auth';

export default function App() {
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
