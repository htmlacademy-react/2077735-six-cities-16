import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavLocationsList from '../../components/favorites-locations-list/favorites-locations-list';
import Spinner from '../../components/spinner/spinner';
import useFavorites from '../../hooks/use-favorites';

export default function Favorites() {
  const { isLoading, isSuccess, favoriteOffers } = useFavorites();
  const showEmpty = isSuccess && favoriteOffers.length === 0;

  return (
    <main
      className={`page__main page__main--favorites${
        !favoriteOffers.length ? ' page__main--favorites-empty' : ''
      }`}
    >
      <div className="page__favorites-container container">
        <section
          className={`favorites${
            !favoriteOffers.length ? ' favorites--empty' : ''
          }`}
        >
          {isLoading && <Spinner />}
          {isSuccess && !showEmpty && (
            <FavLocationsList favorites={favoriteOffers} />
          )}

          {showEmpty && <FavoritesEmpty />}
        </section>
      </div>
    </main>
  );
}
