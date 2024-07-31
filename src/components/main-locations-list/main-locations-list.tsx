import MainLocationsItem from '../main-locations-item/main-locations-item';
import { LOCATIONS } from '../../const';

export default function MainLocationsList() {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {LOCATIONS.map((_location, index) => (
          <MainLocationsItem key={LOCATIONS[index]} city={LOCATIONS[index]} />
        ))}
      </ul>
    </section>
  );
}
