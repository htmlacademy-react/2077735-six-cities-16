import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { SortingOption, Offer } from '../../types';
import { RootState } from '../store';
import { filterOffersByCity } from '../../helpers/filter-offers-by-city';
import { APIRoute, RequestStatus, SORTING_OPTION } from '../../const';

import { createAppAsyncThunk } from '../with-types';

export interface OffersState {
  offers: Offer[];
  requestStatus: RequestStatus;
  currentSortingOption: SortingOption;
}

export const fetchOffers = createAppAsyncThunk(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.offers);
    return data;
  }
);

const initialState: OffersState = {
  offers: [],
  requestStatus: RequestStatus.Idle,
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
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOffers.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});

export const selectOffers = (state: RootState) => state.offers.offers;
export const selectRequestStatus = (state: RootState) =>
  state.offers.requestStatus;
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
