import { AVATAR_SIZE } from '../../const';
import { Review } from '../../types';
import { dateFormatter } from '../../utils/intl';

type ReviewProps = {
  review: Review;
};

export default function OfferReview({ review }: ReviewProps) {
  const { user, comment, date } = review;
  const getAttributeDate = (rawDate: string) => rawDate.split('T')[0];

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            alt="Reviews avatar"
            className="reviews__avatar user__avatar"
            width={AVATAR_SIZE.REVIEW}
            height={AVATAR_SIZE.REVIEW}
            src={user.avatarUrl}
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
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
          {dateFormatter.format(new Date(date))}
        </time>
      </div>
    </li>
  );
}
