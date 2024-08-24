import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { RootState } from '../store';
import { APIRoute, RequestStatus } from '../../const';

import { createAppAsyncThunk } from '../with-types';
import { changeFavorite } from './favorites';

export interface OffersState {
  activeOffer: string;
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
  activeOffer: '',
  offers: [],
  requestStatus: RequestStatus.Idle,
};

export const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    setActiveOffer: (state, action: PayloadAction<string>) => {
      state.activeOffer = action.payload;
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

export const selectOffers = (state: Pick<RootState, 'offers'>) => state.offers.offers;
export const selectActiveOffer = (state: Pick<RootState, 'offers'>) => state.offers.activeOffer;
export const selectOffersRequestStatus = (state: Pick<RootState, 'offers'>) =>
  state.offers.requestStatus;

export const { setActiveOffer } = offersSlice.actions;
