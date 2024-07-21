import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';
import FavLocationsList from '../../components/favorites-locations-list/favorites-locations-list';
import { Offer } from '../../types';

type FavoritesProps = {
  favorites: Offer[];
};

export default function Favorites({ favorites }: FavoritesProps) {
  return (
    <main
      className={`page__main page__main--favorites${
        !favorites.length ? ' page__main--favorites-empty' : ''
      }`}
    >
      <div className="page__favorites-container container">
        <section
          className={`favorites${!favorites.length ? ' favorites--empty' : ''}`}
        >
          {favorites.length ? (
            <FavLocationsList favorites={favorites} />
          ) : (
            <FavoritesEmpty />
          )}
        </section>
      </div>
    </main>
  );
}
