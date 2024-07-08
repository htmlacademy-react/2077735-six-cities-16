import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../../pages/Main/Main';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';
import Offer from '../../pages/Offer/Offer';
import NotFound from '../../pages/NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import {Offer as Place, Comment, AppRoute } from '../../const';

type AppProps = {
  offersCount: number;
  places: Place[];
  comments: Comment[];
};

export default function App({ places, comments, offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route
            index
            element={<Main offersCount={offersCount} places={places} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Offer} element={<Offer comments={comments} />} />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
