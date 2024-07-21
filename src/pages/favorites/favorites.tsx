import FavLocationsList from '../../components/favorites-locations-list/favorites-locations-list';
import { Offer } from '../../types';

type FavoritesProps = {
  favorites: Offer[];
};

export default function Favorites({ favorites }: FavoritesProps) {
  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <FavLocationsList favorites={favorites} />
        </section>
      </div>
    </main>
  );
}
