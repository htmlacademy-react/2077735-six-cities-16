import cn from 'classnames';
import SortOffersMenu from '../sort-offers-menu/sort-offers-menu';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { useMemo, useState } from 'react';
import { getSortedOffers } from '../../helpers/get-sorted-offers';
import { City, Offer, SortingOption } from '../../types';
import { SORTING_OPTION } from '../../const';
import { pluralIntl } from '../../utils/intl';

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
  const [currentSortOption, setCurrentSortOption] = useState<SortingOption>(
    SORTING_OPTION.DEFAULT
  );
  const sortedOffers = useMemo(
    () => getSortedOffers(offers, currentSortOption),
    [offers, currentSortOption]
  );
  //TODO: перенести в стейт?
  const [activeCard, setActiveCard] = useState('');

  const getPlaceString = (count: number) => {
    const pluralKey = pluralIntl.select(count);
    if (pluralKey === 'one') {
      return `${count} place to stay`;
    }
    return `${count} places to stay`;
  };

  const handleCardHover = (offerId: string) => {
    setActiveCard(offerId);
  };

  const handleSortingChange = (option: SortingOption) => {
    setCurrentSortOption(option);
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
            {getPlaceString(offers.length)} in {currentCity.name}
          </b>
          <SortOffersMenu
            currentSortOption={currentSortOption}
            onOptionChange={handleSortingChange}
          />
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
