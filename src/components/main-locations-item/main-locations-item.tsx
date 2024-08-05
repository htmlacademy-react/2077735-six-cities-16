import { APP_ROUTE } from '../../const';
import type { LocationName } from '../../types';
import { Link } from 'react-router-dom';

type MainLocationsItemProps = {
  city: LocationName;
  selectedCity: LocationName;
  onLocationChange: (cityName: LocationName) => void;
};

export default function MainLocationsItem({
  city,
  selectedCity,
  onLocationChange,
}: MainLocationsItemProps) {
  const activeTab = city === selectedCity;

  const handleLocationsItemClick = () => {
    onLocationChange(city);
  };

  return (
    <li className="locations__item" onClick={handleLocationsItemClick}>
      <Link
        className={`${
          activeTab && 'tabs__item--active'
        } locations__item-link tabs__item`}
        to={APP_ROUTE.ROOT}
      >
        <span>{city}</span>
      </Link>
    </li>
  );
}
