import { createSlice } from '@reduxjs/toolkit';
import { APIRoute, RequestStatus } from '../../const';

import type { Offer, OfferDetail } from '../../types';
import { createAppAsyncThunk } from '../with-types';
import { RootState } from '../store';

export const fetchOfferById = createAppAsyncThunk(
  'offer/fetchOfferById',
  async (offerId: string, { extra: api }) => {
    const { data } = await api.get<OfferDetail>(
      `${APIRoute.offers}/${offerId}`
    );
    return data;
  }
);

export const fetchOffersNearby = createAppAsyncThunk(
  'offer/fetchOffersNearby',
  async (offerId: string, { extra: api }) => {
    const { data } = await api.get<Offer[]>(
      `${APIRoute.offers}/${offerId}/nearby`
    );
    return data;
  }
);

type OfferState = {
  offer: OfferDetail | null;
  nearby: Offer[];
  requestStatus: RequestStatus;
};

const initialState: OfferState = {
  offer: null,
  nearby: [],
  requestStatus: RequestStatus.Idle,
};

export const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferById.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchOfferById.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchOfferById.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOffersNearby.fulfilled, (state, action) => {
        state.nearby = action.payload;
      });
  },
});

export const selectOffer = (state: RootState) => state.offer.offer;
export const selectOffersNearby = (state: RootState) => state.offer.nearby;

export default offerSlice.reducer;
