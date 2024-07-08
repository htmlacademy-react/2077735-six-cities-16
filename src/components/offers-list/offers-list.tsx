import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../const';

type OffersListProps = {
  places: Offer[];
};

export default function OffersList({ places }: OffersListProps) {
  //TODO replace with actual logic
  const tempOffersList = places.filter(
    (place) => place.city.name === 'Amsterdam'
  );
  return (
    <div className="cities__places-list places__list tabs__content">
      {tempOffersList.map((place) => (
        <OfferCard
          key={place.id}
          id={place.id}
          title={place.title}
          price={place.price}
          type={place.type}
          isPremium={place.isPremium}
          isFavorite={place.isFavorite}
          previewImage={place.previewImage}
          rating={place.rating}
        />
      ))}
    </div>
  );
}
