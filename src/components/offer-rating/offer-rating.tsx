import { getRatingPercentage } from '../../helpers/get-rating-percentage';

type OfferRatingProps = {
  rating: number;
  isOfferDetail?: boolean;
};

export default function OfferRating({ rating, isOfferDetail }: OfferRatingProps) {
  const ratingWidth = getRatingPercentage(rating);
  const classNamePrefix = isOfferDetail ? 'offer' : 'place-card';
  return (
    <div className={`${classNamePrefix}__rating rating`}>
      <div className={`${classNamePrefix}__stars rating__stars`}>
        <span style={{ width: ratingWidth }} />
        <span className="visually-hidden">Rating</span>
      </div>
      {isOfferDetail && <span className="offer__rating-value rating__value">{rating}</span>}
    </div>
  );
}
