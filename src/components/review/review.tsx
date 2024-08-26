import { AvatarSize } from '../../const';
import { Review } from '../../types';
import { dateFormatter } from '../../helpers/intl';
import Rating from '../rating/rating';

type ReviewProps = {
  review: Review;
};

export default function OfferReview({ review }: ReviewProps) {
  const { user, comment, date, rating } = review;
  const getAttributeDate = (rawDate: string) => rawDate.split('T')[0];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            alt="Reviews avatar"
            className="reviews__avatar user__avatar"
            width={AvatarSize.Review}
            height={AvatarSize.Review}
            src={user.avatarUrl}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <Rating classNamePrefix="reviews" rating={rating} />
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={getAttributeDate(date)}>
          {dateFormatter.format(new Date(date))}
        </time>
      </div>
    </li>
  );
}
