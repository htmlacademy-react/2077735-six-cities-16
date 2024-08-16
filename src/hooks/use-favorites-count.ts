import { useEffect } from 'react';
import UseFavorites from './use-favorites';
import { useAppDispatch } from '../store/hooks';
import { fetchFavorites } from '../store/slices/favorites';

export default function UseFavoritesCount() {
  const { favoritesCount, isIdle } = UseFavorites();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isIdle) {
      dispatch(fetchFavorites());
    }
  }, [isIdle, fetchFavorites, dispatch]);

  return favoritesCount;
}
