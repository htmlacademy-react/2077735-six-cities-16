import { useEffect } from 'react';
import useFavorites from './use-favorites';
import { useAppDispatch } from '../store/hooks';
import { fetchFavorites } from '../store/slices/favorites';

export default function useFavoritesCount() {
  const { favoritesCount, isIdle } = useFavorites();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchFavorites());
    }
  }, [isIdle, dispatch]);

  return favoritesCount;
}
