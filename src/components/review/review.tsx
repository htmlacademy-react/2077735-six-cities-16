import { getAttributeDate, getMarkupDate } from '../../helpers/getReviewDate';
import { Review } from '../../types';
import Avatar from '../avatar/avatar';

type ReviewProps = {
  review: Review;
};

export default function OfferReview({ review }: ReviewProps) {
  const { user, comment, date } = review;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <Avatar user={user} classNamePrefix={'reviews'} />
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={getAttributeDate(date)}>
          {getMarkupDate(date)}
        </time>
      </div>
    </li>
  );
}
