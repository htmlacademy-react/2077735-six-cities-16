import { useMemo } from 'react';
import { APP_ROUTE, LOCATIONS } from '../../const';
import { getRandomLocation } from '../../helpers/get-random-location';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { currentCityChanged } from '../../store/slices/city';

export default function RandomCity() {
  const dispatch = useAppDispatch();
  const randomLocation = useMemo(() => getRandomLocation(LOCATIONS), []);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={APP_ROUTE.ROOT}
          onClick={() => dispatch(currentCityChanged(randomLocation))}
        >
          <span>{randomLocation.name}</span>
        </Link>
      </div>
    </section>
  );
}
