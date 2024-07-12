import { getRatingPercentage } from '../../helpers/getRatingPercentage';

type OfferRatingProps = {
  rating: number;
};

export default function OfferRating({ rating }: OfferRatingProps) {
  const ratingWidth = getRatingPercentage(rating);
  return (
    <div className="place-card__rating rating">
      <div className="place-card__stars rating__stars">
        <span style={{ width: ratingWidth }} />
        <span className="visually-hidden">Rating</span>
      </div>
    </div>
  );
}
