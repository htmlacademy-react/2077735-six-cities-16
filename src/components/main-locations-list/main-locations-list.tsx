import MainLocationsItem from '../main-locations-item/main-locations-item';
import { useLocationsList } from '../../hooks/use-locations-list';

export default function MainLocationsList() {
  //TODO: can I use it, or should it be a constant?
  const locationsList = useLocationsList();
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
