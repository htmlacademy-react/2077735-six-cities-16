import Review from '../review/review';
import { Comment } from '../../const';

type ReviewsListProps = {
  comments: Comment[];
};

export default function ReviewsList({ comments }: ReviewsListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <Review key={comment.id} comment={comment.comment} />
        ))}
      </ul>
    </>
  );
}
