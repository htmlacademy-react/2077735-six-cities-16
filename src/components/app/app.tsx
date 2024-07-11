import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { Offer as Place, Comment } from '../../types';
import { APP_ROUTE } from '../../const';

type AppProps = {
  offersCount: number;
  offers: Place[];
  favorites: Place[];
  comments: Comment[];
};

export default function App({
  offers,
  favorites,
  comments,
  offersCount,
}: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={APP_ROUTE.ROOT} element={<Layout />}>
          <Route
            index
            element={<Main offersCount={offersCount} offers={offers} />}
          />
          <Route
            path={APP_ROUTE.FAVORITES}
            element={
              <PrivateRoute>
                <Favorites favorites={favorites} />
              </PrivateRoute>
            }
          />
          <Route
            path={APP_ROUTE.OFFER}
            element={<Offer comments={comments} />}
          />
        </Route>
        <Route path={APP_ROUTE.LOGIN} element={<Login />} />
        <Route path={APP_ROUTE.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
