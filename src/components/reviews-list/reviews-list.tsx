import OfferReview from '../review/review';
import useReviews from '../../hooks/use-reviews';

export default function ReviewsList() {
  const { reviewsToRender, reviewsCount } = useReviews();

  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviewsCount}</span>
      </h2>
      <ul className="reviews__list">
        {reviewsToRender.map((review) => (
          <OfferReview key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
