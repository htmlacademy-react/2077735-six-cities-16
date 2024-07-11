import FavLocation from '../favorites-location/favorites-location';
import { Offer } from '../../types';

type FavLocationListProps = {
  favorites: Offer[];
};

export default function FavLocationsList({ favorites }: FavLocationListProps) {
  //TODO replace with actual logic
  const sortedByCity = favorites.reduce(
    (result: { [key: string]: Offer[] }, offer) => {
      if (!result[offer.city.name]) {
        result[offer.city.name] = [offer];
      } else {
        result[offer.city.name].push(offer);
      }

      return result;
    },
    {}
  );

  const locations = Object.keys(sortedByCity);

  return (
    <ul className="favorites__list">
      {locations.map((_location, index) => (
        <FavLocation
          key={locations[index]}
          city={locations[index]}
          favorites={sortedByCity[locations[index]]}
        />
      ))}
    </ul>
  );
}
