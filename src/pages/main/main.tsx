import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import OffersFilter from '../../components/offers-filter/offers-filter';
import OffersList from '../../components/offers-list/offers-list';
import { Offer } from '../../types';

type MainProps = {
  offersCount: number;
  places: Offer[];
};

export default function Main({ places, offersCount }: MainProps) {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <MainLocationsList />
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {offersCount} places to stay in Amsterdam
              </b>
              <OffersFilter />
              <div className="cities__places-list places__list tabs__content">
                <OffersList places={places} />
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
