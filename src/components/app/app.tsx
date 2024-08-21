import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from '../../pages/main-page/main-page';
import Favorites from '../../pages/favorites-page/favorites-page';
import Login from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFound from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../protected-route/protected-route';
import { APP_ROUTE } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { checkAuth } from '../../store/slices/auth';
import { useEffect } from 'react';

export default function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: APP_ROUTE.ROOT,
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
        <ProtectedRoute publicRoute>
          <Login />
        </ProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
}
