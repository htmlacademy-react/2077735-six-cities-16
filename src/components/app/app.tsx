import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Main from '../../pages/Main/Main';
import Favorites from '../../pages/Favorites/Favorites';
import Login from '../../pages/Login/Login';
import Offer from '../../pages/Offer/Offer';
import NotFound from '../../pages/NotFound/NotFound';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import { Place, AppRoute } from '../../const';

type AppProps = {
  offersCount: number;
  places: Place[];
};

export default function App({ places, offersCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
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
          <Route path={AppRoute.Offer} element={<Offer />} />
        </Route>
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
