import MainScreen from '../../pages/main/main';
// import Favorites from '../../pages/favorites/favorites';
// import Login from '../../pages/login/login';
// import Offer from '../../pages/offer/offer';
import { Place } from '../../const';

type AppProps = {
  offersCount: number;
  places: Place[];
};

function App({ places, offersCount }: AppProps): JSX.Element {
  return (
    <>
      <MainScreen offersCount={offersCount} places={places} />
      {/* <Favorites /> */}
      {/* <Login /> */}
      {/* <Offer /> */}
    </>
  );
}
export default App;
