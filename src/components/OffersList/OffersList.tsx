import OfferCard from '../OfferCard/OfferCard';
import { Place } from '../../const';

type OffersListProps = {
  places: Place[];
};

export default function OffersList({ places }: OffersListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {places.map((place) => (
        <OfferCard
          key={place.id}
          id={place.id}
          title={place.title}
          price={place.price}
          type={place.type}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
        />
      ))}
    </div>
  );
}
