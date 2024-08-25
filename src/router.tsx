import { createBrowserRouter } from 'react-router-dom';
import { APP_ROUTE } from './const';
import Main from './pages/main-page/main-page';
import ProtectedRoute from './components/protected-route/protected-route';
import Favorites from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import Login from './pages/login-page/login-page';
import NotFound from './pages/not-found-page/not-found-page';

export const router = createBrowserRouter([
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
