import { RequestStatus } from '../const';
import { useAppSelector } from '../store/hooks';
import {
  selectFavorites,
  selectFavoritesStatus,
} from '../store/slices/favorites';

export default function useFavorites() {
  const favoriteOffers = useAppSelector(selectFavorites);
  const status = useAppSelector(selectFavoritesStatus);

  return {
    favoritesCount: favoriteOffers.length,
    isIdle: status === RequestStatus.Idle,
    isLoading: status === RequestStatus.Loading,
    isSuccess: status === RequestStatus.Success,
    favoriteOffers,
  };
}
