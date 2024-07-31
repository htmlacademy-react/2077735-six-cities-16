import OfferReview from '../review/review';
import { Review } from '../../types';

type ReviewsListProps = {
  reviews: Review[];
};

const sortOffersByDate = (a: Review, b: Review) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

export default function ReviewsList({ reviews }: ReviewsListProps) {
  const tempOfferReviews = reviews.sort(sortOffersByDate);
  //TODO: add slice for rendering only the first 10 comments
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {tempOfferReviews.map((review) => (
          <OfferReview key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
