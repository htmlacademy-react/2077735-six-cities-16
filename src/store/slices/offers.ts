import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { RootState } from '../store';
import { APIRoute, RequestStatus } from '../../const';

import { createAppAsyncThunk } from '../with-types';
import { changeFavorite } from './favorites';

export interface OffersState {
  offers: Offer[];
  requestStatus: RequestStatus;
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
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    offersSet: (state, action: PayloadAction<Offer[]>) => {
      state.offers = action.payload;
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
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        const offerToChange = action.payload.offer;
        const foundOffer = state.offers.find(
          (offer) => offer.id === offerToChange.id
        );
        if (foundOffer) {
          foundOffer.isFavorite = offerToChange.isFavorite;
        }
      });
  },
});

export const selectOffers = (state: RootState) => state.offers.offers;
export const selectOffersRequestStatus = (state: RootState) =>
  state.offers.requestStatus;

//example of memoized selector:

// export const selectOffersByCityName = (state: RootState, cityName: string) => {
//   const offersList = state.offers.offers;
//   return filterOffersByCity(offersList, cityName);
// };
// --->
// export const selectOffersByCityName = createSelector([selectOffers, selectCurrentCity], (offers, cityName)=>{offers.filter((offer) => offer.city.name === cityName.name)});

export const { offersSet } = offersSlice.actions;
export default offersSlice.reducer;
