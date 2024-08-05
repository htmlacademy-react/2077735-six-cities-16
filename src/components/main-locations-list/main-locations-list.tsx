import MainLocationsItem from '../main-locations-item/main-locations-item';
import { LOCATIONS_NAMES } from '../../const';

import type { LocationName } from '../../types';

type MainLocationsListProps = {
  selectedCity: LocationName;
  onLocationChange: (cityName: LocationName) => void;
};

export default function MainLocationsList({
  selectedCity,
  onLocationChange,
}: MainLocationsListProps) {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS_NAMES.map((_location, index) => (
          <MainLocationsItem
            key={LOCATIONS_NAMES[index]}
            city={LOCATIONS_NAMES[index]}
            selectedCity={selectedCity}
            onLocationChange={onLocationChange}
          />
        ))}
      </ul>
    </section>
  );
}
