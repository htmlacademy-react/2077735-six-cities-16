import { useState } from 'react';
import MainLocationsList from '../../components/main-locations-list/main-locations-list';
import OffersFilter from '../../components/offers-filter/offers-filter';
import OffersList from '../../components/offers-list/offers-list';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';
import Map from '../../components/map/map';
import { LOCATIONS } from '../../const';

import type { LocationName, Offer } from '../../types';

type MainProps = {
  offersCount: number;
  offers: Offer[];
};

export default function Main({ offers, offersCount }: MainProps) {
  //TODO replace with actual logic
  const [selectedCity, setSelectedCity] = useState<LocationName>('Paris');
  const [activeCard, setActiveCard] = useState('');
  const tempOffersList = filterOffersByCity(offers, selectedCity);

  const handleCardHover = (offerId: string) => {
    setActiveCard(offerId);
  };

  const handleLocationChange = (cityName: LocationName) => {
    setSelectedCity(cityName);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <MainLocationsList
          selectedCity={selectedCity}
          onLocationChange={handleLocationChange}
        />
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {offersCount} places to stay in {selectedCity}
            </b>
            <OffersFilter />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={tempOffersList}
                className="cities"
                onCardHover={handleCardHover}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <Map
              city={LOCATIONS[selectedCity]}
              offers={tempOffersList}
              activeOffer={activeCard}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
