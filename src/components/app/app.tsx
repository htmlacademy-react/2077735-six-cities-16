import MainScreen from '../../pages/main/main';
import { Place } from '../../const';

type AppProps = {
  offersCount: number;
  places: Place[];
};

function App({ places, offersCount }: AppProps): JSX.Element {
  return <MainScreen offersCount={offersCount} places={places} />;
}
export default App;
