import { useAppSelector } from '../../store/hooks';
import { selectCurrentCity } from '../../store/slices/current-city-slice';
import {
  selectCurrentSortOption,
  selectOffersByCityName,
} from '../../store/slices/offers-slice';

import { useState } from 'react';
import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import SortOffersMenu from '../../components/sort-offers-menu/sort-offers-menu';
import OffersList from '../../components/offers-list/offers-list';
import Map from '../../components/map/map';
import { getSortedOffers } from '../../helpers/get-sorted-offers';

export default function Main() {
  const currentCity = useAppSelector(selectCurrentCity);
  const offers = useAppSelector((state) =>
    selectOffersByCityName(state, currentCity.name)
  );
  const currentSortOption = useAppSelector(selectCurrentSortOption);
  const sortedOffers = getSortedOffers(offers, currentSortOption);

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
            <SortOffersMenu />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={sortedOffers}
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
