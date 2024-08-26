import { createBrowserRouter } from 'react-router-dom';
import { AppRoute } from './const';
import Main from './pages/main-page/main-page';
import ProtectedRoute from './components/protected-route/protected-route';
import Favorites from './pages/favorites-page/favorites-page';
import OfferPage from './pages/offer-page/offer-page';
import Login from './pages/login-page/login-page';
import NotFound from './pages/not-found-page/not-found-page';

export const router = createBrowserRouter([
  {
    path: AppRoute.Root,
    element: <Main />,
  },
  {
    path: AppRoute.Favorites,
    element: (
      <ProtectedRoute>
        <Favorites />
      </ProtectedRoute>
    ),
  },
  {
    path: AppRoute.OfferId,
    element: <OfferPage />,
  },
  {
    path: AppRoute.Login,
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
