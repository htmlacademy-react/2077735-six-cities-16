import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';
import { filterOffersByFav } from '../../helpers/filter-offers-by-fav';

type OffersListProps = {
  places: Offer[];
  isFavorites?: boolean;
  city?: string;
};

export default function OffersList({
  places,
  isFavorites,
  city,
}: OffersListProps) {
  //TODO replace with actual logic
  let tempOffersList = [];
  if (isFavorites && city) {
    tempOffersList = filterOffersByCity(filterOffersByFav(places), city);
  } else {
    tempOffersList = filterOffersByCity(places, 'Paris');
  }

  return (
    <>
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
          isFavorites={isFavorites}
        />
      ))}
    </>
  );
}
