import cn from 'classnames';
import SortOffersMenu from '../sort-offers-menu/sort-offers-menu';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentSortOption } from '../../store/slices/offers';
import { useState } from 'react';
import { getSortedOffers } from '../../helpers/get-sorted-offers';
import { City, Offer } from '../../types';

type OffersListContainerProps = {
  offers: Offer[];
  isEmpty: boolean;
  currentCity: City;
};

export default function OffersListContainer({
  offers,
  isEmpty,
  currentCity,
}: OffersListContainerProps) {
  const currentSortOption = useAppSelector(selectCurrentSortOption);
  const sortedOffers = getSortedOffers(offers, currentSortOption);
  //TODO: перенести в стейт?
  const [activeCard, setActiveCard] = useState('');

  const handleCardHover = (offerId: string) => {
    setActiveCard(offerId);
  };

  return (
    <div className="cities">
      <div
        className={cn(
          'cities__places-container container',
          isEmpty && 'cities__places-container--empty'
        )}
      >
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
  );
}
