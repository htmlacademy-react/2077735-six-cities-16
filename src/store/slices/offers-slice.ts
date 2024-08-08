import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SortingOption, Offer } from '../../types';
import { RootState } from '../store';
import { OFFERS } from '../../mocks/offers';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';
import { SORTING_OPTION } from '../../const';

export interface OffersState {
  offers: Offer[];
  currentSortingOption: SortingOption;
}

const initialState: OffersState = {
  offers: OFFERS,
  currentSortingOption: SORTING_OPTION.DEFAULT,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    offersSet: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
    },
    offersSortingOptionChanged: (
      state,
      action: PayloadAction<SortingOption>
    ) => {
      state.currentSortingOption = action.payload;
    },
  },
});

export const selectOffers = (state: RootState) => state.offers.offers;
export const selectCurrentSortOption = (state: RootState) =>
  state.offers.currentSortingOption;

export const selectOffersByCityName = (state: RootState, cityName: string) => {
  const offersList = state.offers.offers;

  return filterOffersByCity(offersList, cityName);
};

export const selectOffersGroupedByCity = (state: RootState) => {
  const offersList = state.offers.offers;

  return offersList.reduce((result: { [key: string]: Offer[] }, offer) => {
    if (!result[offer.city.name]) {
      result[offer.city.name] = [offer];
    } else {
      result[offer.city.name].push(offer);
    }

    return result;
  }, {});
};

export const { offersSet, offersSortingOptionChanged } = offersSlice.actions;
export default offersSlice.reducer;
