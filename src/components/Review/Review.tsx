import { Comment } from '../../types';
import Avatar from '../avatar/avatar';

type ReviewProps = Pick<Comment, 'comment'>;

export default function Review({ comment }: ReviewProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <Avatar />
        <span className="reviews__user-name">Max</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: '80%' }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">
          April 2019
        </time>
      </div>
    </li>
  );
}
