import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import OffersFilter from '../../components/offers-filter/offers-filter';
import OffersList from '../../components/offers-list/offers-list';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';
import { Offer } from '../../types';

type MainProps = {
  offersCount: number;
  offers: Offer[];
};

export default function Main({ offers, offersCount }: MainProps) {
  //TODO replace with actual logic
  const tempOffersList = filterOffersByCity(offers, 'Amsterdam');

  return (
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
              <OffersList offers={tempOffersList} className='cities' />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" />
          </div>
        </div>
      </div>
    </main>
  );
}
