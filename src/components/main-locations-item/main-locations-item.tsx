import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  currentCityChanged,
  selectCurrentCity,
} from '../../store/slices/city';
import { Link } from 'react-router-dom';

import type { City } from '../../types';

type MainLocationsItemProps = {
  locationsItem: City;
};

export default function MainLocationsItem({
  locationsItem,
}: MainLocationsItemProps) {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector(selectCurrentCity);
  const activeTab = locationsItem.name === selectedCity.name;

  const handleLocationChange = () => {
    dispatch(currentCityChanged(locationsItem));
  };

  return (
    <li className="locations__item" onClick={handleLocationChange}>
      <Link
        className={`${
          activeTab && 'tabs__item--active'
        } locations__item-link tabs__item`}
        to={AppRoute.Root}
      >
        <span>{locationsItem.name}</span>
      </Link>
    </li>
  );
}
