import OfferCard from '../offer-card/offer-card';
import { Offer } from '../../types';

type OffersListProps = {
  offers: Offer[];
  className: string;
  onCardHover?: (offerId: string) => void;
};

export default function OffersList({
  offers,
  className,
  onCardHover,
}: OffersListProps) {
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
          onCardHover={onCardHover}
        />
      ))}
    </>
  );
}
