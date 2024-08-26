import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type FavLocationProps = {
  cityName: string;
  favorites: Offer[];
};

export default function FavLocation({ cityName, favorites }: FavLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link className="locations__item-link" to={AppRoute.Root}>
            <span>{cityName}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={favorites} className='favorites' />
      </div>
    </li>
  );
}
