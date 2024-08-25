import useFavoritesCount from '../../hooks/use-favorites-count';

export default function FavoriteCount() {
  const favoritesCount = useFavoritesCount();

  return <span className="header__favorite-count">{favoritesCount}</span>;
}
