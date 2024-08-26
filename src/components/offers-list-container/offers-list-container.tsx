import cn from 'classnames';
import SortOffersMenu from '../sort-offers-menu/sort-offers-menu';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import { useMemo, useState } from 'react';
import { getSortedOffers } from '../../helpers/get-sorted-offers';
import { City, Offer, TSortingOption } from '../../types';
import { SortingOption } from '../../const';
import { pluralIntl } from '../../helpers/intl';
import { setActiveOffer } from '../../store/slices/offers';
import { useAppDispatch } from '../../store/hooks';

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
  const [currentSortOption, setCurrentSortOption] = useState<TSortingOption>(
    SortingOption.Default
  );
  const sortedOffers = useMemo(
    () => getSortedOffers(offers, currentSortOption),
    [offers, currentSortOption]
  );

  const dispatch = useAppDispatch();

  const getPlaceString = (count: number) => {
    const pluralKey = pluralIntl.select(count);
    if (pluralKey === 'one') {
      return `${count} place to stay`;
    }
    return `${count} places to stay`;
  };

  const handleCardHover = (offerId: string) => {
    dispatch(setActiveOffer(offerId));
  };

  const handleSortingChange = (option: TSortingOption) => {
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
          <Map cityLocation={currentCity.location} offers={offers} />
        </div>
      </div>
    </div>
  );
}
