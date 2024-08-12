import { LOCATIONS } from '../../const';
import MainLocationsItem from '../main-locations-item/main-locations-item';

export default function MainLocationsList() {
  const locationsList = LOCATIONS;
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {locationsList.map((location) => (
          <MainLocationsItem key={location.name} locationsItem={location} />
        ))}
      </ul>
    </section>
  );
}
