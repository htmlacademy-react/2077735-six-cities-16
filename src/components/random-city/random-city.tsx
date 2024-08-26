import { useMemo } from 'react';
import { AppRoute, Locations } from '../../const';
import { getRandomLocation } from '../../helpers/get-random-location';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { currentCityChanged } from '../../store/slices/city';

export default function RandomCity() {
  const dispatch = useAppDispatch();
  const randomLocation = useMemo(() => getRandomLocation(Locations), []);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.Root}
          onClick={() => dispatch(currentCityChanged(randomLocation))}
        >
          <span>{randomLocation.name}</span>
        </Link>
      </div>
    </section>
  );
}
