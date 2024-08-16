import UseFavoritesCount from '../../hooks/use-favorites-count';

export default function FavoriteCount() {
  const favoritesCount = UseFavoritesCount();

  return <span className="header__favorite-count">{favoritesCount}</span>;
}
