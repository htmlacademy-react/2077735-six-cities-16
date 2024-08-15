import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types';
import { APIRoute, FavoriteStatus, RequestStatus } from '../../const';

import { createAppAsyncThunk } from '../with-types';
import { RootState } from '../store';

export const fetchFavorites = createAppAsyncThunk(
  'favorites/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offer[]>(APIRoute.favorites);
    return data;
  }
);

type changeFavoriteProps = {
  offerId: string;
  status: FavoriteStatus;
};

export const changeFavorite = createAppAsyncThunk(
  'favorites/changeFavorite',
  async ({ offerId, status }: changeFavoriteProps, { extra: api }) => {
    const { data } = await api.post<Offer>(
      `${APIRoute.favorites}/${offerId}/${status}`
    );
    return { offer: data, status };
  }
);

export interface FavoritesState {
  favorites: Offer[];
  requestStatus: RequestStatus;
}

const initialState: FavoritesState = {
  favorites: [],
  requestStatus: RequestStatus.Idle,
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchFavorites.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(changeFavorite.fulfilled, (state, action) => {
        switch (action.payload.status) {
          case FavoriteStatus.Added:
            state.favorites.push(action.payload.offer);
            break;
          case FavoriteStatus.Removed:
            state.favorites = state.favorites.filter(
              (offer) => offer.id !== action.payload.offer.id
            );
        }
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(changeFavorite.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(changeFavorite.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      });
  },
});

export const selectFavorites = (state: RootState) => state.favorites.favorites;
export const selectFavoritesStatus = (state: RootState) =>
  state.favorites.requestStatus;

export default favoritesSlice.reducer;
