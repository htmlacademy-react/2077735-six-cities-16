import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';

type OffersListProps = {
  offers: Offer[];
  isFavorites?: boolean;
};

export default function OffersList({ offers, isFavorites }: OffersListProps) {

  //TODO replace with actual logic
  const tempOffersList = filterOffersByCity(offers, 'Amsterdam');
  return (
    <>
      {tempOffersList.map((offer) => (
        <OfferCard
          key={offer.id}
          id={offer.id}
          title={offer.title}
          price={offer.price}
          type={offer.type}
          isPremium={offer.isPremium}
          isFavorite={offer.isFavorite}
          previewImage={offer.previewImage}
          rating={offer.rating}
          isFavorites={isFavorites}
        />
      ))}
    </>
  );
}
