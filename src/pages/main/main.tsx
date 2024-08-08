import { useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/current-city-slice';
import { selectOffersByCityName } from '../../store/slices/offers-slice';

import { useState } from 'react';
import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import OffersFilter from '../../components/offers-filter/offers-filter';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';

export default function Main() {
  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector((state) =>
    selectOffersByCityName(state, currentCity.name)
  );
  const [activeCard, setActiveCard] = useState('');

  const handleCardHover = (offerId: string) => {
    setActiveCard(offerId);
  };

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
              {offers.length} places to stay in {currentCity.name}
            </b>
            <OffersFilter />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={offers}
                className="cities"
                onCardHover={handleCardHover}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              cityLocation={currentCity.location}
              offers={offers}
              activeOffer={activeCard}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
