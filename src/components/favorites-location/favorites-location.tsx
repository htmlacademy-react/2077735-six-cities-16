import OffersList from '../offers-list/offers-list';
import { Offer } from '../../types';

type FavLocationProps = {
  city: string;
  favorites: Offer[];
};

export default function FavLocation({ city, favorites }: FavLocationProps) {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <a className="locations__item-link" href="#">
            <span>{city}</span>
          </a>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList offers={favorites} isFavorites city={city} />
      </div>
    </li>
  );
}
