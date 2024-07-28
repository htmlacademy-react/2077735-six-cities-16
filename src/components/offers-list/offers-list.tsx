import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types';

type OffersListProps = {
  offers: Offer[];
  className: string;
};

export default function OffersList({ offers, className }: OffersListProps) {

  return (
    <>
      {offers.map((offer) => (
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
          className={className}
        />
      ))}
    </>
  );
}
