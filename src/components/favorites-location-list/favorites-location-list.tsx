import FavLocation from '../favorites-location/favorites-location';
import { Offer } from '../../types';

const locations = ['Amsterdam', 'Paris'];

type FavLocationListProps = {
  places: Offer[];
};

export default function FavLocationList({ places }: FavLocationListProps) {
  return (
    <ul className="favorites__list">
      {locations.map((_location, index) => (
        <FavLocation key={locations[index]} city={locations[index]} places={places} />
      ))}
    </ul>
  );
}
