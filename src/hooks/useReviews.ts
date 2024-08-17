import { REVIEWS_COUNT } from '../const';
import { useAppSelector } from '../store/hooks';
import { selectReviews } from '../store/slices/reviews';

export function useReviews() {
  const reviews = useAppSelector(selectReviews);
  return {
    reviewsToRender: reviews.slice(0, REVIEWS_COUNT),
    reviewsCount: reviews.length,
  };
}
