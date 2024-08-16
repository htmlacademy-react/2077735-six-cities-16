import FavLocation from '../favorites-location/favorites-location';

import type { Offer } from '../../types';

type FavLocationListProps = {
  favorites: Offer[];
};

export default function FavLocationsList({ favorites }: FavLocationListProps) {
  const groupedByCity = favorites.reduce(
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
  const locations = Object.keys(groupedByCity);

  return (
    <>
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {locations.map((cityName) => (
          <FavLocation
            key={cityName}
            cityName={cityName}
            favorites={groupedByCity[cityName]}
          />
        ))}
      </ul>
    </>
  );
}
