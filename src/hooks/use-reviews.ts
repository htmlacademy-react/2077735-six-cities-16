import { MaxCount } from '../const';
import { useAppSelector } from '../store/hooks';
import { selectReviews } from '../store/slices/reviews';

export default function useReviews() {
  const reviews = useAppSelector(selectReviews);
  return {
    reviewsToRender: reviews.slice(0, MaxCount.Reviews),
    reviewsCount: reviews.length,
  };
}
